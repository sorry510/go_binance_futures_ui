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
        <el-button
          type="success"
          size="mini"
          @click="$router.push({ name: 'futuresAccount' })"
        >
          {{ $t('route.futuresAccount') }}
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
        :label="$t('trade.strategyType')"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.strategy_type" size="small" @change="edit(scope.row)">
            <el-option :label="$t('strategyType.global')" value="global" />
            <el-option :label="$t('strategyType.custom')" value="custom" />
            <el-option :label="$t('strategyType.line1')" value="line1" />
            <el-option :label="$t('strategyType.line2')" value="line2" />
            <el-option :label="$t('strategyType.line3')" value="line3" />
            <el-option :label="$t('strategyType.line4')" value="line4" />
            <el-option :label="$t('strategyType.line5')" value="line5" />
            <el-option :label="$t('strategyType.line6')" value="line6" />
            <el-option :label="$t('strategyType.line7')" value="line7" />
          </el-select>
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
      <!-- <el-table-column
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
      </el-table-column> -->
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
    <!-- add coin -->
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
    <!--  batch edit -->
    <el-dialog :title="dialogTitle2" :visible.sync="dialogFormVisible2">
      <el-form
        ref="dataForm2"
        :model="batchInfo"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('trade.strategyType')" prop="strategyType">
          <el-select v-model="batchInfo.strategyType" size="small">
            <el-option :label="$t('strategyType.global')" value="global" />
            <el-option :label="$t('strategyType.custom')" value="custom" />
            <el-option :label="$t('strategyType.line1')" value="line1" />
            <el-option :label="$t('strategyType.line2')" value="line2" />
            <el-option :label="$t('strategyType.line3')" value="line3" />
            <el-option :label="$t('strategyType.line4')" value="line4" />
            <el-option :label="$t('strategyType.line5')" value="line5" />
            <el-option :label="$t('strategyType.line6')" value="line6" />
            <el-option :label="$t('strategyType.line7')" value="line7" />
          </el-select>
        </el-form-item>
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
                  type="number"
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
                  type="number"
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
                  type="number"
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
                  type="number"
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
                  type="number"
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
                  type="number"
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
                  type="number"
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
import { getFeatures, setFeature, addFeature, delFeature, enableFeature, batchEdit } from '@/api/trade'
import { round } from 'mathjs'

export default {
  data() {
    return {
      klineInterval: [
        '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'
      ],
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
        loss: undefined,
        marginType: undefined,
        leverage: undefined,
        strategyType: undefined
      },
      rowKey(row) {
        return row.symbol + row.id
      },
      expandKeys: [],
      timeId: null,
      interval: 30,

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
  computed: {
    allProfit() {
      const profit = this.list.reduce(
        (carry, row) => carry + row.nowProfit,
        0
      )
      return round(profit, 2)
    }
  },
  activated() {
    console.log('activated')
    this.interval = localStorage.getItem('refreshInterval') || 30
    this.fetchData()
  },
  deactivated() {
    clearInterval(this.timeId)
  },
  async created() {
    const search = localStorage.getItem('futures_search')
    if (search) {
      this.search = JSON.parse(search)
    }
    this.interval = localStorage.getItem('refreshInterval') || 30
    await this.fetchData()
  },
  beforeDestroy() {
    localStorage.setItem('futures_search', JSON.stringify(this.search))
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
      clearInterval(this.timeId)
      // this.listLoading = true
      this.getFutures()
      this.timeId = setInterval(() => this.getFutures(), this.interval * 1000)
      // this.listLoading = false
    },
    async getFutures() {
      const search = this.search
      const { data } = await getFeatures({ sort: this.sort, ...search })
      this.list = data.map(item => ({ ...item, enable: item.enable > 0 }))
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
          loss: undefined,
          marginType: undefined,
          leverage: undefined,
          strategyType: undefined
        }
        this.dialogFormVisible2 = false
        await this.fetchData()
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'success' })
      }
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
    async confirmTechnology() {
      try {
        Object.keys(this.technology).forEach(key => {
          this.technology[key].forEach(item => {
            if (item.period) {
              item.period = Number(item.period)
            }
            if (item.multiplier) {
              item.multiplier = Number(item.multiplier)
            }
            if (item.std_dev_multiplier) {
              item.std_dev_multiplier = Number(item.std_dev_multiplier)
            }
          })
        })
        await setFeature(this.technologySymbolId, { technology: JSON.stringify(this.technology) })
        this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
        await this.fetchData()
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'success' })
      }
      // this.dialogTechnologyVisible = false
    },
    async confirmStrategy() {
      try {
        await setFeature(this.strategySymbolId, { strategy: JSON.stringify(this.strategy) })
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
