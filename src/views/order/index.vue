<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-input
        v-model="listQuery.symbol"
        size="mini"
        :placeholder="$t('trade.coin')"
        style="width: 200px; margin-right: 10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="listQuery.start_time"
        size="mini"
        type="datetime"
        class="filter-item"
        :placeholder="$t('table.startTime')"
        :picker-options="pickerOptions"
      />
      <el-date-picker
        v-model="listQuery.end_time"
        size="mini"
        type="datetime"
        class="filter-item"
        :placeholder="$t('table.endTime')"
        :picker-options="pickerOptions"
      />
      <el-button
        size="mini"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        :loading="listLoading"
        @click="handleFilter"
      >{{ $t('table.search') }}</el-button>
      <el-button
        type="danger"
        size="mini"
        :loading="listLoading"
        @click="deleteALl()"
      >
        {{ $t('table.deleteAll') }}
      </el-button>
      <div style="float:right; margin-right: 10px;">{{ $t('trade.nowProfit') }}: {{ allProfit }}</div>
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
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

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
        :label="$t('trade.tradeType')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ $t('trade.' + scope.row.side) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.positionSide')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ $t('trade.' + scope.row.positionSide.toLowerCase()) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.profit')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.side === 'close' ? scope.row.inexact_profit : '-' }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.amount')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="价格"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.avg_price }}
        </template>
      </el-table-column> -->
      <el-table-column
        :label="$t('trade.time')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.updateDate }}
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<style scoped>
.filter-item {
  margin-right: 10px;
}

</style>

<script>
import { getOrders, delAllTrade } from '@/api/order'
import Pagination from '@/components/Pagination'
import { round } from 'mathjs'

export default {
  components: { Pagination },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: this.$t('table.today'),
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: this.$t('table.yesterday'),
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: this.$t('table.lastWeek'),
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '+',
        start_time: undefined,
        end_time: undefined,
        symbol: undefined
      },
      listLoading: false,
      rowKey(row) {
        return row.symbol
      },
      expandKeys: []
    }
  },
  computed: {
    allProfit() {
      const profit = this.list.reduce(
        (carry, row) => carry + Number(row.inexact_profit),
        0
      )
      return round(profit, 2)
    }
  },
  async created() {
    await this.getList()
  },
  beforeDestroy() {
  },
  methods: {
    round(data, num = 2) {
      return round(data, num)
    },
    expandChange(row, expandedRows) {
      this.expandKeys = expandedRows.map(item => item.symbol)
    },
    sortChange(data) {
      const { order } = data
      this.listQuery.sort = order === 'ascending' ? '+' : '-'
      this.getList()
    },
    async getList() {
      this.listLoading = true
      const { data } = await getOrders({
        ...this.listQuery,
        start_time: this.listQuery.start_time ? +(this.listQuery.start_time) : undefined,
        end_time: this.listQuery.end_time ? +(this.listQuery.end_time) : undefined
      })
      this.list = data.list ?? []
      this.total = data.total
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    deleteALl() {
      this.$confirm(`${this.$t('table.confirmDeleteAll')}`)
        .then(async() => {
          try {
            await delAllTrade()
            this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
            await this.getList()
          } catch (e) {
            this.$message({ message: this.$t('table.actionFail'), type: 'success' })
          }
        })
        .catch(() => {})
    }
  }
}
</script>
