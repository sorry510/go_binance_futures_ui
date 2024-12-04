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
      <el-select v-model="listQuery.type" clearable size="mini" class="filter-item" style="width: 75px;" placeholder="status">
        <el-option :label="$t('table.all')" value="all" />
        <el-option :label="$t('table.open')" value="open" />
        <el-option :label="$t('table.close')" value="close" />
      </el-select>
      <el-select v-model="listQuery.position_side" clearable size="mini" class="filter-item" style="width: 75px;" placeholder="position_side">
        <el-option :label="$t('table.all')" value="all" />
        <el-option :label="$t('trade.long')" value="LONG" />
        <el-option :label="$t('trade.short')" value="SHORT" />
      </el-select>
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
        :label="$t('trade.amount')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.tradeType')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ $t('trade.' + scope.row.side) }}</span>
          <span v-if="scope.row.is_close" style="color: green;">({{ $t('trade.is_closed') }})</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.positionSide')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.positionSide === 'LONG'" style="color: green;">{{ $t('trade.' + scope.row.positionSide.toLowerCase()) }}</span>
          <span v-else style="color: red;">{{ $t('trade.' + scope.row.positionSide.toLowerCase()) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.leverage')"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.leverage }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.price')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.avg_price }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.now_price')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.is_close">-</span>
          <span v-else-if="scope.row.inexact_profit < 0" style="color: red;">{{ scope.row.now_price }}</span>
          <span v-else style="color: green;">{{ scope.row.now_price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.profit')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.is_close">-</span>
          <span v-else-if="scope.row.inexact_profit < 0" style="color: red;">{{ scope.row.inexact_profit }}</span>
          <span v-else style="color: green;">{{ scope.row.inexact_profit }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('position.nowProfit')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.is_close || scope.row.side === 'close'">-</span>
          <span v-else-if="scope.row.profit_percent < 0" style="color: red;">{{ scope.row.profit_percent }}</span>
          <span v-else style="color: green;">{{ scope.row.profit_percent }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.time')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ parseTime(scope.row.updateTime) }}
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
import { parseTime } from '@/utils/index'

export default {
  components: { Pagination },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: this.$t('table.today'),
          onClick(picker) {
            picker.$emit('pick', new Date())
          },
        }, {
          text: this.$t('table.yesterday'),
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          },
        }, {
          text: this.$t('table.lastWeek'),
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          },
        }],
      },
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 200,
        sort: '+',
        start_time: undefined,
        end_time: undefined,
        symbol: undefined,
        type: '',
        position_side: '',
      },
      listLoading: false,
      rowKey(row) {
        return row.symbol + row.id
      },
      expandKeys: [],
    }
  },
  computed: {
    allProfit() {
      const profit = this.list.reduce(
        (carry, row) => carry + Number(row.inexact_profit),
        0,
      )
      return round(profit, 2)
    },
  },
  async created() {
    let search = localStorage.getItem('futures_order_search')
    if (search) {
      search = JSON.parse(search)
      if (search.start_time) {
        search.start_time = new Date(search.start_time)
      }
      if (search.end_time) {
        search.end_time = new Date(search.end_time)
      }
      this.listQuery = search
    }
    await this.getList()
  },
  beforeDestroy() {
  },
  methods: {
    parseTime,
    toPeriod(endTime, startTime) {
      const totalMinutes = (endTime - startTime) / 1000 / 60
      const hours = Math.floor(totalMinutes / 60)
      const minutes = Math.floor(totalMinutes % 60)
      return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}`
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, '0')
    },
    round(data, num = 3) {
      return round(data, num)
    },
    profitPercent(row) {
      let cha = row.now_price - row.avg_price
      if (row.positionSide === 'SHORT') {
        cha = -cha
      }
      return cha / row.now_price * row.leverage * 100
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
      localStorage.setItem('futures_order_search', JSON.stringify(this.listQuery))
      this.listLoading = true

      try {
        const { data } = await getOrders({
          ...this.listQuery,
          start_time: this.listQuery.start_time ? +(this.listQuery.start_time) : undefined,
          end_time: this.listQuery.end_time ? +(this.listQuery.end_time) : undefined,
        })
        const dataList = data.list
        const closeDataGroupByOrderId = {}
        dataList.map(item => {
          if (item.side === 'close') {
            closeDataGroupByOrderId[item.order_id] = item
          }
        })
        this.list = dataList.map(item => {
          if (item.side === 'open') {
            item.inexact_profit = 0
            const closeData = closeDataGroupByOrderId[item.order_id]
            item.is_close = !!closeData
            if (!item.is_close) {
              let cha = item.now_price - item.avg_price
              if (item.positionSide === 'SHORT') {
                cha = -cha
              }
              item.inexact_profit = this.round(cha * item.amount)
              item.profit_percent = this.round(this.profitPercent(item))
            }
          }
          return item
        })
        this.total = data.total
      } catch (e) {
        console.log(e)
      } finally {
        this.listLoading = false
      }
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
    },
  },
}
</script>
