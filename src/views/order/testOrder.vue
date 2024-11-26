<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-input
        v-model="listQuery.symbol"
        size="mini"
        :placeholder="$t('trade.coin')"
        style="width: 150px;"
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
        @click="deleteAll()"
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
        :label="$t('trade.positionSide')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.position_side === 'LONG'" style="color: green;">{{ $t('trade.' + scope.row.position_side.toLowerCase()) }}</span>
          <span v-else style="color: red;">{{ $t('trade.' + scope.row.position_side.toLowerCase()) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.amount')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.position_amt }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.usdt')"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.usdt }}
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
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.now_price')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.now_price - scope.row.price < 0" style="color: red;">{{ scope.row.now_price }}</span>
          <span v-else style="color: green;">{{ scope.row.now_price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.profit')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.close_profit == '0'">-</span>
          <span v-else-if="scope.row.close_profit < 0" style="color: red;">{{ scope.row.close_profit }}</span>
          <span v-else style="color: green;">{{ scope.row.close_profit }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('position.nowProfit')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.profit_percent == 0">-</span>
          <span v-else-if="scope.row.profit_percent < 0" style="color: red;">{{ scope.row.profit_percent }}</span>
          <span v-else style="color: green;">{{ scope.row.profit_percent }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('trade.close_price')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.close_price !== '0' ? scope.row.close_price : '-' }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.period')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.createTime === scope.row.updateTime ? '-' : toPeriod(scope.row.updateTime, scope.row.createTime ) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.time')"
        align="center"
        width="140"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ parseTime(scope.row.createTime) }}
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="info-table-expand">
            <el-form-item :label="`${$t('trade.open_strategy')}`">
              <codemirror
                style="width: 100%"
                :value="props.row.open_strategy"
                :options="cmOptions"
                disabled
              />
            </el-form-item>
            <el-form-item v-if="props.row.close_strategy" :label="`${$t('trade.close_strategy')}`">
              <codemirror
                style="width: 100%"
                :value="props.row.close_strategy"
                :options="cmOptions"
              />
            </el-form-item>
          </el-form>
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
    width: 100%;
  }
</style>

<script>
import { getResults, delAllResults, delResults } from '@/api/testStrategyResult'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils/index'
import { round } from 'mathjs'

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js' // 支持JavaScript语言

import 'codemirror/addon/selection/active-line' // 光标行背景高亮，配置里面也需要styleActiveLine设置为true
import 'codemirror/keymap/sublime' // sublime编辑器效果
import 'codemirror/mode/css/css'
import 'codemirror/theme/monokai.css' // 编辑器主题样式，配置里面theme需要设置monokai
import 'codemirror/theme/base16-dark.css'

// 折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'

// 括号匹配
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'

export default {
  components: { Pagination, codemirror },
  data() {
    return {
      cmOptions: {
        tabSize: 2,
        mode: 'text/x-ttcn-cfg',
        theme: 'monokai',
        lineNumbers: true,
        line: true,
        foldGutter: true,
        lineWrapping: true,
        autoFormatJson: true,
        jsonIndentation: true,
        gutters: [
          'CodeMirror-linenumbers',
          'CodeMirror-foldgutter',
          'CodeMirror-lint-markers',
        ],
        extraKeys: { 'Tab': 'autocomplete' },
      },
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
        type: 'all',
        position_side: 'all',
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
        (carry, row) => carry + Number(row.close_profit),
        0,
      )
      return round(profit, 2)
    },
  },
  async created() {
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
      if (row.close_price === '0') {
        if (row.position_side === 'LONG') {
          return (row.now_price - row.price) / row.now_price * row.leverage * 100
        } else if (row.position_side === 'SHORT') {
          return -(row.now_price - row.price) / row.now_price * row.leverage * 100
        }
      }
      if (row.position_side === 'LONG') {
        return (row.close_price - row.price) / row.close_price * row.leverage * 100
      } else if (row.position_side === 'SHORT') {
        return -(row.close_price - row.price) / row.close_price * row.leverage * 100
      }
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
      const { data } = await getResults({
        ...this.listQuery,
        start_time: this.listQuery.start_time ? +(this.listQuery.start_time) : undefined,
        end_time: this.listQuery.end_time ? +(this.listQuery.end_time) : undefined,
      })
      this.list = (data.list ?? []).map(item => {
        item.profit_percent = this.round(this.profitPercent(item))
        item.now_profit = this.profit_percent
        if (item.close_profit === '0') {
          item.close_profit = this.round((item.now_price - item.price) * item.position_amt)
        }
        return item
      })
      this.total = data.total
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    deleteAll() {
      this.$confirm(`${this.$t('table.confirmDeleteAll')}`)
        .then(async() => {
          try {
            await delAllResults()
            this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
            await this.getList()
          } catch (e) {
            this.$message({ message: this.$t('table.actionFail'), type: 'success' })
          }
        })
        .catch(() => {})
    },
    async del(row) {
      // this.$confirm(`${this.$t('table.deleteConfirm')} ${row.symbol}?`)
      //   .then(async() => {
      //     try {
      //       await delResults(row.id)
      //       this.$message({ message: this.$t('table.deleteSuccess'), type: 'success' })
      //       await this.fetchData()
      //     } catch (e) {
      //       this.$message({ message: this.$t('table.deleteFail'), type: 'success' })
      //     }
      //   })
      //   .catch(() => {})
      try {
        await delResults(row.id)
        this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
        await this.getList()
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'success' })
      }
    },
  },
}
</script>
