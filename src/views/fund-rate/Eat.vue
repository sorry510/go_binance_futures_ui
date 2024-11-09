<template>
  <div class="app-container">
    <div style="margin-bottom: 10px; display: flex;justify-content: space-between;align-items: center;">
      <div style="color:red;">
        {{ $t('trade.fundRateEatTips') }}
      </div>
    </div>
    <div style="margin-bottom: 10px">
      <el-button
        type="success"
        size="mini"
        @click="openDialog()"
      >
        {{ $t('table.add') }}
      </el-button>
      <el-button
        type="primary"
        size="mini"
        :loading="listLoading"
        @click="fetchData()"
      >
        {{ $t('table.refresh') }}
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      size="mini"
      :row-key="rowKey"
      :expand-row-keys="expandKeys"
      highlight-current-row
      @sort-change="sortChange"
      @expand-change="expandChange"
    >
      <el-table-column
        :label="$t('trade.coin')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.symbol }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.spot') + $t('trade.coin')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.spot_symbol }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.futures') + $t('trade.coin')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.futures_symbol }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.usdt')"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.enable">
            {{ scope.row.total_amount }}
          </span>
          <el-input
            v-else
            v-model="scope.row.total_amount"
            class="edit-input"
            size="small"
            @blur="edit(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.leverage')"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.enable">
            {{ scope.row.leverage }}
          </span>
          <el-input
            v-else
            v-model="scope.row.leverage"
            class="edit-input"
            size="small"
            @blur="edit(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('trade.enable')" align="center" width="80">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.enable"
            active-color="#13ce66"
            inactive-color="#dcdfe6"
            @change="changeSwitch($event, row)"
          />
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="info-table-expand">
            <el-form-item :label="`${$t('trade.spot')} ${$t('trade.usdt')}:`">
              <span>{{ props.row.spot_amount }}</span>
            </el-form-item>
            <el-form-item :label="`${$t('trade.futures')} ${$t('trade.usdt')}:`">
              <span>{{ props.row.futures_amount }} X {{ props.row.leverage }}</span>
            </el-form-item>
            <el-form-item :label="`${$t('trade.spot')} ${$t('trade.price')}:`">
              <span>{{ props.row.spot_price }}</span>
            </el-form-item>
            <el-form-item :label="`${$t('trade.futures')} ${$t('trade.price')}:`">
              <span>{{ props.row.futures_price }}</span>
            </el-form-item>
            <el-form-item :label="`${$t('trade.startTime')}:`">
              <span>{{ props.row.start_time ? parseTime(props.row.start_time) : '-' }}</span>
            </el-form-item>
            <el-form-item :label="`${$t('trade.endTime')}:`">
              <span>{{ props.row.end_time ? parseTime(props.row.end_time) : '-' }}</span>
            </el-form-item>
            <el-form-item :label="`${$t('trade.profit')}:`">
              <span>{{ props.row.profit }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="80"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            type="danger"
            size="mini"
            @click="del(row)"
          >{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="info"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('trade.coin')" prop="symbol">
          <el-input v-model="info.symbol" />
        </el-form-item>
        <el-form-item :label="$t('trade.spot') + $t('trade.coin')" prop="spot_symbol">
          <el-input v-model="info.spot_symbol" />
        </el-form-item>
        <el-form-item :label="$t('trade.futures') + $t('trade.coin')" prop="futures_symbol">
          <el-input v-model="info.futures_symbol" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" :loading="dialogLoading" @click="addCoin(info)">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .info-table-expand {
    font-size: 0;
  }
  .info-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .info-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import { getList, editData, addData, delData, start, end } from '@/api/fund_rate_eat'
import { parseTime } from '@/utils/index'
import { round } from 'mathjs'

export default {
  data() {
    return {
      list: [],
      tickets: {},
      sort: '+',
      listLoading: false,
      serviceLoading: false,
      enableLoading: false,
      timeId: null,
      buyAll: true,
      sellAll: true,
      dialogFormVisible: false,
      dialogLoading: false,
      dialogTitle: 'add symbols',
      info: {},
      rowKey(row) {
        return row.symbol
      },
      expandKeys: [],
    }
  },
  async created() {
    await this.fetchData()
    // this.timeId = setInterval(() => this.fetchData(), 5 * 1000)
  },
  beforeDestroy() {
    // clearInterval(this.timeId)
  },
  methods: {
    parseTime,
    round(data, num = 2) {
      return round(data, num)
    },
    expandChange(row, expandedRows) {
      this.expandKeys = expandedRows.map(item => item.symbol)
    },
    sortChange(data) {
      const { order } = data
      this.sort = order === 'ascending' ? '+' : '-'
      this.fetchData()
    },
    async fetchData() {
      // this.listLoading = true
      const { data } = await getList({ sort: this.sort })
      this.list = data.map(item => ({ ...item, enable: item.enable > 0 }))
      // this.listLoading = false
    },
    async edit(row) {
      const { id, enable, leverage, usdt, ...data } = row
      try {
        await editData(id, { ...data, leverage: Number(leverage), usdt, enable: enable ? 1 : 0 })
        this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
        await this.fetchData()
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'success' })
      }
    },
    del(row) {
      this.$confirm(this.$t('table.deleteConfirm') + ` ${row.symbol} ？`)
        .then(async() => {
          try {
            await delData(row.id)
            this.$message({ message: this.$t('table.deleteSuccess'), type: 'success' })
            await this.fetchData()
          } catch (e) {
            this.$message({ message: this.$t('table.deleteFail'), type: 'success' })
          }
        })
        .catch(() => {})
    },
    async changeSwitch(enable, row) {
      this.$confirm(this.$t(enable ? 'table.startBot' : 'table.endBot') + `: ${row.symbol} ？`)
        .then(async() => {
          try {
            if (enable) {
              await start(row.id)
            } else {
              await end(row.id)
            }
            this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
            await this.fetchData()
          } catch (e) {
            this.$message({ message: this.$t('table.actionFail'), type: 'error' })
          }
        })
        .catch(() => {
          row.enable = !row.enable
        })
    },
    openDialog() {
      this.dialogTitle = this.$t('table.add')
      this.dialogFormVisible = true
    },
    async addCoin(row) {
      const data = {
        ...row,
      }
      await addData(data)
      await this.fetchData()
      this.dialogFormVisible = false
    },
  },
}
</script>
