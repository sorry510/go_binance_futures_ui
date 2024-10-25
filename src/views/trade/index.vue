<template>
  <div class="app-container">
    <div style="margin-bottom: 10px; display: flex;justify-content: space-between;align-items: center;">
      <div
        style="display: flex;flex-flow: row wrap;gap: 10px; width:75%"
      >
        <el-button
          type="success"
          size="mini"
          @click="openDialog()"
        >
          {{ $t('table.add') }}
        </el-button>
        <el-button
          type="success"
          size="mini"
          :loading="serviceLoading"
          @click="enableAll(1)"
        >
          {{ $t('table.enableAllCoins') }}
        </el-button>
        <el-button
          type="danger"
          size="mini"
          :loading="serviceLoading"
          @click="enableAll(0)"
        >
          {{ $t('table.disableAllCoins') }}
        </el-button>
        <el-button
          type="success"
          size="mini"
          @click="dialogFormVisible2 = true"
        >
          {{ $t('table.editBatch') }}
        </el-button>
      </div>
      <div style="width:25%;text-align:right;">
        {{ $t('table.totalCount') }}: {{ list.length }}
      </div>
    </div>
    <div style="display: flex;justify-content: space-between;align-items: center; margin-bottom: 10px;">
      <div style="display: flex;flex-flow: row wrap;gap: 10px;">
        <el-input
          v-model="search.symbol"
          :placeholder="$t('trade.coin')"
          style="width: 150px;"
          class="filter-item"
          size="small"
        />
        <el-select v-model="search.enable" size="small" style="width: 150px;" placeholder="status">
          <el-option :label="$t('table.all')" value="" />
          <el-option :label="$t('table.open')" value="1" />
          <el-option :label="$t('table.close')" value="0" />
        </el-select>
        <el-select v-model="search.margin_type" size="small" style="width: 150px;" placeholder="margin_type">
          <el-option :label="$t('table.all')" value="" />
          <el-option :label="$t('trade.ISOLATED')" value="ISOLATED" />
          <el-option :label="$t('trade.CROSSED')" value="CROSSED" />
        </el-select>
        <el-button
          type="success"
          size="mini"
          @click="fetchData"
        >
          {{ $t('table.search') }}
        </el-button>
      </div>
      <div style="display: flex;flex-flow: row wrap;gap: 10px;align-items: center;">
        <el-select v-model="interval" size="small" style="width: 80px;" @change="changeRefreshInterval">
          <el-option v-for="n in 30" :key="n" :label="n + 's'" :value="n" />
        </el-select>
        <span>{{ $t('table.refreshInterval') }}</span>
      </div>
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
      <!-- <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column> -->

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
        :label="$t('trade.nowPrice')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ round(scope.row.close, 10) }}
        </template>
      </el-table-column>
      <el-table-column
        label="24h↑↓"
        align="center"
        show-overflow-tooltip
        sortable="custom"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.percentChange < 0" style="color: red;">{{ scope.row.percentChange }}%↓ </span>
          <span v-else style="color: green;">{{ scope.row.percentChange }}%↑ </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.klineInterval')"
        align="center"
        width="110"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.kline_interval" size="small" @change="edit(scope.row)">
            <el-option label="1m" value="1m" />
            <el-option label="3m" value="3m" />
            <el-option label="5m" value="5m" />
            <el-option label="15m" value="15m" />
            <el-option label="30m" value="30m" />
            <el-option label="1h" value="1h" />
            <el-option label="2h" value="2h" />
            <el-option label="4h" value="4h" />
            <el-option label="6h" value="6h" />
            <el-option label="8h" value="8h" />
            <el-option label="12h" value="12h" />
            <el-option label="1d" value="1d" />
            <el-option label="3d" value="3d" />
            <el-option label="1w" value="1w" />
            <el-option label="1M" value="1M" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.marginType')"
        align="center"
        width="130"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.marginType" size="small" @change="edit(scope.row)">
            <el-option :label="$t('trade.ISOLATED')" value="ISOLATED" />
            <el-option :label="$t('trade.CROSSED')" value="CROSSED" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.usdt')"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.usdt"
            class="edit-input"
            size="small"
            @blur="edit(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.leverage')"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.leverage"
            class="edit-input"
            size="small"
            @blur="edit(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.profitRate')"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.profit"
            class="edit-input"
            size="small"
            @blur="edit(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.lossRate')"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.loss"
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
            @change="isChangeBuy($event, row)"
          />
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
          >{{ $t('table.delete') }}
          </el-button>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" :loading="dialogLoading" @click="addCoin(info)">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="dialogTitle2" :visible.sync="dialogFormVisible2">
      <el-form
        ref="dataForm2"
        :model="batchInfo"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('trade.marginType')" prop="marginType">
          <el-select v-model="batchInfo.marginType" size="small">
            <el-option :label="$t('trade.ISOLATED')" value="ISOLATED" />
            <el-option :label="$t('trade.CROSSED')" value="CROSSED" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('trade.usdt')" prop="usdt">
          <el-input v-model="batchInfo.usdt" />
        </el-form-item>
        <el-form-item :label="$t('trade.leverage')" prop="leverage">
          <el-input v-model="batchInfo.leverage" />
        </el-form-item>
        <el-form-item :label="$t('trade.profitRate')" prop="profit">
          <el-input v-model="batchInfo.profit" />
        </el-form-item>
        <el-form-item :label="$t('trade.lossRate')" prop="loss">
          <el-input v-model="batchInfo.loss" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" :loading="dialogLoading2" @click="batchEdit(batchInfo)">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getFeatures, setFeature, addFeature, delFeature, enableFeature, batchEdit } from '@/api/trade'
import { round } from 'mathjs'

export default {
  data() {
    return {
      list: [],
      sort: '+',
      listLoading: false,
      serviceLoading: false,
      enableLoading: false,
      buyAll: true,
      sellAll: true,
      search: {
        symbol: '',
        enable: '',
        margin_type: ''
      },

      dialogFormVisible: false,
      dialogLoading: false,
      dialogTitle: this.$t('table.add'),
      info: {},

      dialogFormVisible2: false,
      dialogLoading2: false,
      dialogTitle2: this.$t('table.editBatch'),
      batchInfo: {
        usdt: undefined,
        profit: undefined,
        loss: undefined
      },
      rowKey(row) {
        return row.symbol
      },
      expandKeys: [],
      timeId: null,
      interval: 30
    }
  },
  computed: {
    allProfit() {
      const profit = this.list.reduce(
        (carry, row) => carry + row.nowProfit,
        0
      )
      return round(profit, 2)
    }
  },
  async created() {
    this.interval = localStorage.getItem('refreshInterval') || 30
    await this.fetchData()
    this.timeId = setInterval(() => this.fetchData(), this.interval * 1000)
  },
  beforeDestroy() {
    clearInterval(this.timeId)
  },
  methods: {
    changeRefreshInterval(val) {
      localStorage.setItem('refreshInterval', val)
      clearInterval(this.timeId)
      this.timeId = setInterval(() => this.fetchData(), val * 1000)
    },
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
      const search = this.search
      const { data } = await getFeatures({ sort: this.sort, ...search })
      this.list = data.map(item => ({ ...item, enable: item.enable > 0 }))
      // this.listLoading = false
    },
    async edit(row) {
      const { id, enable, leverage, usdt, ...data } = row
      try {
        await setFeature(id, { ...data, leverage: Number(leverage), usdt, enable: enable ? 1 : 0 })
        this.$message({ message: this.$t('table.editSuccess'), type: 'success' })
        await this.fetchData()
      } catch (e) {
        this.$message({ message: this.$t('table.editFail'), type: 'success' })
      }
    },
    del(row) {
      this.$confirm(`${this.$t('table.deleteConfirm')} ${row.symbol}?`)
        .then(async() => {
          try {
            await delFeature(row.id)
            this.$message({ message: this.$t('table.deleteSuccess'), type: 'success' })
            await this.fetchData()
          } catch (e) {
            this.$message({ message: this.$t('table.deleteFail'), type: 'success' })
          }
        })
        .catch(() => {})
    },
    enableAll(flag) {
      const text = flag === 1 ? this.$t('table.enableAllCoins') : this.$t('table.disableAllCoins')
      this.$confirm(text)
        .then(async() => {
          try {
            await enableFeature(flag)
            this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
            await this.fetchData()
          } catch (e) {
            this.$message({ message: this.$t('table.actionFail'), type: 'success' })
          }
        })
        .catch(() => {})
    },
    async isChangeBuy(event, row) {
      await this.edit(row)
    },
    openDialog() {
      this.dialogTitle = this.$t('table.add')
      this.dialogFormVisible = true
    },
    async addCoin(row) {
      const data = {
        'symbol': row.symbol,
        'quantity': 20,
        'percentChange': 0,
        'close': 0,
        'open': 0,
        'low': 0,
        'enable': 1,
        'updateTime': +new Date()
      }
      await addFeature(data)
      this.dialogFormVisible = false
    },
    async batchEdit(batchInfo) {
      try {
        await batchEdit(batchInfo)
        this.batchInfo = {
          usdt: undefined,
          profit: undefined,
          loss: undefined
        }
        this.dialogFormVisible2 = false
        await this.fetchData()
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'success' })
      }
    }
  }
}
</script>
