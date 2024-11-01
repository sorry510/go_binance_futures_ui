<template>
  <div class="app-container">
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
        :label="$t('trade.technology')"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="openTechnologyDialog(scope.row)"
          > {{ $t('trade.technology') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.strategy')"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="openStrategyDialog(scope.row)"
          > {{ $t('trade.strategy') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.keltnerChannels')"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.listen_type === 'kline_kc'"
            type="success"
            size="mini"
            @click="openKlineDialog(scope.row)"
          >chart
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.listenType')"
        align="center"
        width="130"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.listen_type" size="small" @change="edit(scope.row)">
            <el-option :label="$t('trade.klineBase')" value="kline_base" />
            <el-option :label="$t('trade.keltnerChannels')" value="kline_kc" />
            <el-option :label="$t('trade.custom')" value="custom" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.klineInterval')"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-select v-if="scope.row.listen_type === 'kline_base'" v-model="scope.row.kline_interval" size="small" @change="edit(scope.row)">
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
          <el-select v-if="scope.row.listen_type === 'kline_kc'" v-model="scope.row.kline_interval" size="small" @change="edit(scope.row)">
            <el-option label="15m" value="15m" />
            <el-option label="1h" value="1h" />
            <el-option label="4h" value="4h" />
            <el-option label="1d" value="1d" />
            <el-option label="3d" value="3d" />
            <el-option label="1w" value="1w" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.changePercent')"
        align="center"
        width="110"
      >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.listen_type === 'kline_base'"
            v-model="scope.row.change_percent"
            class="edit-input"
            size="small"
            @blur="edit(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.noticeLimitMin')"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.notice_limit_min"
            class="edit-input"
            size="small"
            @blur="edit(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('trade.lastNotice')"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          {{ scope.row.last_notice_time !== 0 ? parseTime(scope.row.last_notice_time) : '' }}
          {{ typeText(scope.row.last_notice_type) }}
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
    <!-- 新增 coin -->
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
    <!-- kc 图 -->
    <el-dialog :title="dialogTitleKline" :visible.sync="dialogKlineVisible" width="75%" center>
      <div id="chart">
        <apexchart type="line" height="450" :options="chartOptions" :series="series" />
      </div>
    </el-dialog>
    <!-- 技术指标 -->
    <el-dialog :title="dialogTechnologyTitle" :visible.sync="dialogTechnologyVisible">
      <el-tabs value="ma">
        <el-tab-pane label="ma" name="ma">
          <div>
            <el-button type="primary" @click="addMa">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :data="technology.ma"
            border
            fit
            size="mini"
            highlight-current-row
            style="margin-top: 10px"
          >
            <el-table-column
              :label="$t('technology.name')"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="small">
                  <el-option v-for="item in klineInterval" :key="item" :label="item" :value="item" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.period')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.period"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.enable')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enable"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              align="center"
              width="100"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delMa(scope)"
                >{{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="ema" name="ema">
          <div>
            <el-button type="primary" @click="addEma">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :data="technology.ema"
            border
            fit
            size="mini"
            highlight-current-row
            style="margin-top: 10px"
          >
            <el-table-column
              :label="$t('technology.name')"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="small">
                  <el-option v-for="item in klineInterval" :key="item" :label="item" :value="item" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.period')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.period"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.enable')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enable"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              align="center"
              width="100"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delEma(scope)"
                >{{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="rsi" name="rsi">
          <div>
            <el-button type="primary" @click="addRsi">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :data="technology.rsi"
            border
            fit
            size="mini"
            highlight-current-row
            style="margin-top: 10px"
          >
            <el-table-column
              :label="$t('technology.name')"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="small">
                  <el-option v-for="item in klineInterval" :key="item" :label="item" :value="item" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.period')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.period"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.enable')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enable"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              align="center"
              width="100"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delRsi(scope)"
                >{{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="kc" name="kc">
          <div>
            <el-button type="primary" @click="addKc">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :data="technology.kc"
            border
            fit
            size="mini"
            highlight-current-row
            style="margin-top: 10px"
          >
            <el-table-column
              :label="$t('technology.name')"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="small">
                  <el-option v-for="item in klineInterval" :key="item" :label="item" :value="item" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.period')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.period"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.multiplier')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.multiplier"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.enable')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enable"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              align="center"
              width="100"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delKc(scope)"
                >{{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="boll" name="boll">
          <div>
            <el-button type="primary" @click="addBoll">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :data="technology.boll"
            border
            fit
            size="mini"
            highlight-current-row
            style="margin-top: 10px"
          >
            <el-table-column
              :label="$t('technology.name')"
              align="center"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="small">
                  <el-option v-for="item in klineInterval" :key="item" :label="item" :value="item" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.period')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.period"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.std_dev_multiplier')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.std_dev_multiplier"
                  class="edit-input"
                  size="small"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.enable')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.enable"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              align="center"
              width="100"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delBoll(scope)"
                >{{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTechnologyVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" :loading="dialogLoading" @click="confirmTechnology()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 策略方法 -->
    <el-dialog :title="dialogStrategyTitle" :visible.sync="dialogStrategyVisible" width="75%">
      <div>
        <el-button type="primary" @click="addStrategy">{{ $t('table.add') }}</el-button>
      </div>
      <el-table
        :data="strategy"
        border
        fit
        size="mini"
        highlight-current-row
        style="margin-top: 10px"
      >
        <el-table-column
          :label="$t('strategy.name')"
          align="center"
          width="300"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              class="edit-input"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('strategy.code')"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.code"
              type="textarea"
              :rows="6"
              size="small"
              class="edit-input"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('strategy.type')"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.type" size="small">
              <el-option :label="$t('trade.long')" value="long" />
              <el-option :label="$t('trade.short')" value="short" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('strategy.enable')"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.actions')"
          align="center"
          width="100"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              @click="delStrategy(scope)"
            >{{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogStrategyVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" :loading="dialogLoading" @click="confirmStrategy()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getListenCoins, setListenCoin, addListenCoin, delListenCoin, getKcLineChart } from '@/api/listenCoin'
import { round } from 'mathjs'
import VueApexCharts from 'vue-apexcharts'
import { parseTime } from '@/utils'

export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      klineInterval: [
        '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'
      ],
      cssVisible: false,

      list: [],
      tickets: {},
      sort: '+',
      listLoading: false,
      enableLoading: false,
      dialogFormVisible: false,
      dialogLoading: false,
      dialogTitle: '新增币种信息',
      dialogTitleKline: '', // k线图
      dialogKlineVisible: false,
      info: {},
      rowKey(row) {
        return row.symbol
      },
      expandKeys: [],

      series: [
        // {
        //   name: 'High - 2013',
        //   data: [28, 29, 33, 36, 32, 32, 33]
        // },
        // {
        //   name: 'Low - 2013',
        //   data: [12, 11, 14, 18, 17, 13, 13]
        // }
      ],
      chartOptions: {
        chart: {
          height: 450,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454', '#545454', '#545454', '#77B6EA', '#F56c6c', '#F56c6c', '#F56c6c'],
        dataLabels: {
          enabled: false
        },
        // stroke: {
        //   curve: 'smooth'
        // },
        title: {
          text: 'kc channels',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        markers: {
          size: 1
        },
        // xaxis: {
        //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        //   // title: {
        //   //   text: '4h'
        //   // }
        // },
        yaxis: {
          title: {
            text: 'price'
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
      dialogTechnologyTitle: '',
      dialogTechnologyVisible: false,
      technologySymbolId: 0,
      technology: {
        ma: [],
        ema: [],
        rsi: [],
        kc: [],
        boll: []
      },

      dialogStrategyTitle: '',
      dialogStrategyVisible: false,
      strategySymbolId: 0,
      strategy: []
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
    typeText(type) {
      return {
        'up': this.$t('trade.up'),
        'down': this.$t('trade.down')
      }[type] || ''
    },
    parseTime,
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
      const { data } = await getListenCoins({ sort: this.sort, type: 2 })
      this.list = data.map(item => ({ ...item, enable: item.enable > 0 }))
      // this.listLoading = false
    },
    async edit(row) {
      const { id, enable, notice_limit_min, ...other } = row
      try {
        await setListenCoin(id, { notice_limit_min: Number(notice_limit_min), enable: enable ? 1 : 0, ...other })
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
            await delListenCoin(row.id)
            this.$message({ message: this.$t('table.deleteSuccess'), type: 'success' })
            await this.fetchData()
          } catch (e) {
            this.$message({ message: this.$t('table.deleteFail'), type: 'success' })
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
    async getKcLineChart(row) {
      const { data } = await getKcLineChart(row.id)
      console.log(data)
      const limit = 50
      const kcWideHigh = {
        name: 'kc3.75-high',
        data: data.upper2.slice(0, limit).reverse().map(item => this.roundOrderPrice(item))
      }
      const kcNarrowHigh = {
        name: 'kc2.75-high',
        data: data.upper1.slice(0, limit).reverse().map(item => this.roundOrderPrice(item))
      }
      const kcNarrowMa = {
        name: 'kc2.75-ma',
        data: data.ma1.slice(0, limit).reverse().map(item => this.roundOrderPrice(item))
      }
      const kcNarrowLow = {
        name: 'kc2.75-low',
        data: data.lower1.slice(0, limit).reverse().map(item => this.roundOrderPrice(item))
      }
      const kcWideLow = {
        name: 'kc3.75-low',
        data: data.lower2.slice(0, limit).reverse().map(item => this.roundOrderPrice(item))
      }
      const close = {
        name: 'close',
        data: data.close1.slice(0, limit).reverse().map(item => this.roundOrderPrice(item))
      }
      // const high = {
      //   name: 'high',
      //   data: data.high1.slice(0, limit).reverse().map(item => this.roundOrderPrice(item))
      // }
      // const low = {
      //   name: 'low',
      //   data: data.low1.slice(0, limit).reverse().map(item => this.roundOrderPrice(item))
      // }
      this.series = []
      this.series.push(kcWideHigh)
      this.series.push(kcWideLow)
      this.series.push(kcNarrowHigh)
      this.series.push(kcNarrowMa)
      this.series.push(kcNarrowLow)

      this.series.push(close)
      // this.series.push(high)
      // this.series.push(low)
    },
    async openTechnologyDialog(row) {
      this.technologySymbolId = row.id
      if (row.technology) {
        try {
          this.technology = JSON.parse(row.technology)
        } catch (e) {
          this.technology = {
            ma: [],
            ema: [],
            rsi: [],
            kc: [],
            boll: []
          }
        }
      } else {
        this.technology = {
          ma: [],
          ema: [],
          rsi: [],
          kc: [],
          boll: []
        }
      }
      this.dialogTechnologyTitle = `${row.symbol} ${this.$t('trade.technology')}`
      this.dialogTechnologyVisible = true
    },
    async openStrategyDialog(row) {
      this.strategySymbolId = row.id
      if (row.strategy) {
        try {
          this.strategy = JSON.parse(row.strategy)
        } catch (e) {
          this.strategy = []
        }
      } else {
        this.strategy = []
      }
      this.dialogStrategyTitle = `${row.symbol} ${this.$t('trade.strategy')}`
      this.dialogStrategyVisible = true
    },
    async openKlineDialog(row) {
      try {
        await this.getKcLineChart(row)
      } catch (e) {
        console.log(e)
        this.$message({ message: this.$t('table.actionFail'), type: 'error' })
        return
      }
      this.dialogTitleKline = `${row.symbol}(${row.kline_interval})`
      this.dialogKlineVisible = true
    },
    async addCoin(row) {
      const data = {
        ...row,
        'type': 2, // 合约交易
        'createTime': +new Date(),
        'updateTime': +new Date()
      }
      await addListenCoin(data)
      await this.fetchData()
      this.dialogFormVisible = false
    },
    roundOrderPrice(price, symbol = null) {
      const whiteSymbols = {
        'MKRUSDT': 1,
        'CRVUSDT': 3,
        'XTZUSDT': 3
      }
      if (whiteSymbols[symbol]) {
        return round(price, whiteSymbols[symbol])
      }
      if (price > 500) {
        return round(price, 1)
      } else if (price > 10) {
        return round(price, 2)
      } else if (price > 1) {
        return round(price, 3)
      } else if (price > 0.1) {
        return round(price, 4)
      } else if (price > 0.01) {
        return round(price, 5)
      } else {
        return round(price, 6)
      }
    },
    async confirmTechnology() {
      try {
        await setListenCoin(this.technologySymbolId, { technology: JSON.stringify(this.technology) })
        this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
        await this.fetchData()
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'success' })
      }
      // this.dialogTechnologyVisible = false
    },
    async confirmStrategy() {
      try {
        await setListenCoin(this.strategySymbolId, { strategy: JSON.stringify(this.strategy) })
        this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
        await this.fetchData()
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'success' })
      }
      // this.dialogStrategyVisible = false
    },
    addMa() {
      this.technology.ma = [
        ...this.technology.ma,
        {
          name: '',
          kline_interval: '',
          period: 14,
          enable: false
        }
      ]
    },
    delMa(scope) {
      this.technology.ma = this.technology.ma.filter((item, index) => index !== scope.$index)
    },
    addEma() {
      this.technology.ema = [
        ...this.technology.ema,
        {
          name: '',
          kline_interval: '',
          period: 14,
          enable: false
        }
      ]
    },
    delEma(scope) {
      this.technology.ema = this.technology.ema.filter((item, index) => index !== scope.$index)
    },
    addRsi() {
      this.technology.rsi = [
        ...this.technology.rsi,
        {
          name: '',
          kline_interval: '',
          period: 14,
          enable: false
        }
      ]
    },
    delRsi(scope) {
      this.technology.rsi = this.technology.rsi.filter((item, index) => index !== scope.$index)
    },
    addKc() {
      this.technology.kc = [
        ...this.technology.kc,
        {
          name: '',
          kline_interval: '',
          period: 50,
          multiplier: 2.75,
          enable: false
        }
      ]
    },
    delKc(scope) {
      this.technology.kc = this.technology.kc.filter((item, index) => index !== scope.$index)
    },
    addBoll() {
      this.technology.boll = [
        ...this.technology.boll,
        {
          name: '',
          kline_interval: '',
          period: 21,
          std_dev_multiplier: 2,
          enable: false
        }
      ]
    },
    delBoll(scope) {
      this.technology.boll = this.technology.boll.filter((item, index) => index !== scope.$index)
    },
    addStrategy() {
      this.strategy = [
        ...this.strategy,
        {
          name: '',
          type: '',
          code: '',
          enable: false
        }
      ]
    },
    delStrategy(scope) {
      this.strategy = this.strategy.filter((item, index) => index !== scope.$index)
    }
  }
}
</script>
