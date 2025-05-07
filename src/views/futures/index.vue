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
          type="info"
          size="mini"
          @click="$router.push({ name: 'futuresAccount' })"
        >
          {{ $t('route.futuresAccount') }}
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
          type="primary"
          size="mini"
          @click="dialogFormVisible2 = true"
        >
          {{ $t('table.editBatch') }}
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="$router.push({ name: 'strategyTemplate' })"
        >
          {{ $t('route.strategyTemplate') }}
        </el-button>
      </div>
      <div style="width:25%;text-align:right;">
        {{ $t('table.totalCount') }}: {{ total }}
      </div>
    </div>
    <div style="display: flex;justify-content: space-between;align-items: center; margin-bottom: 10px;">
      <div style="display: flex;flex-flow: row wrap;gap: 10px;">
        <el-input
          v-model="search.symbol"
          :placeholder="$t('trade.coin')"
          style="width: 150px;"
          class="filter-item"
          size="mini"
        />
        <el-select v-model="search.pin" size="mini" style="width: 100px;" clearable placeholder="pin">
          <el-option :label="$t('trade.pin')" value="1" />
        </el-select>
        <el-select v-model="search.enable" size="mini" style="width: 100px;" clearable placeholder="status">
          <el-option :label="$t('table.open')" value="1" />
          <el-option :label="$t('table.close')" value="0" />
        </el-select>
        <el-select v-model="search.margin_type" size="mini" style="width: 120px;" clearable placeholder="margin_type">
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
        <el-select v-model="interval" size="mini" style="width: 80px;" @change="changeRefreshInterval">
          <el-option v-for="n in 30" :key="n" :label="n + 's'" :value="n" />
        </el-select>
        <span>{{ $t('table.refreshInterval') }}</span>
      </div>
    </div>
    <el-tabs v-model="search.symbol_type" @tab-click="handleTabClick">
      <el-tab-pane label="USDT" name="USDT">
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
            :label="$t('trade.pin')"
            width="50"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-rate v-model="row.pin_read" :max="1" @change="editPin(row)" />
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
            :label="$t('trade.strategyType')"
            align="center"
            width="115"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.strategy_type" size="mini" @change="edit(scope.row)">
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
            width="115"
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
            width="90"
            show-overflow-tooltip
            prop="percent_change"
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
          <el-select v-model="scope.row.kline_interval" size="mini" @change="edit(scope.row)">
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
            width="125"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.marginType" size="mini" @change="edit(scope.row)">
                <el-option :label="$t('trade.ISOLATED')" value="ISOLATED" />
                <el-option :label="$t('trade.CROSSED')" value="CROSSED" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('trade.usdt')"
            align="center"
            width="75"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.usdt"
                class="edit-input"
                size="mini"
                @blur="edit(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('trade.leverage')"
            align="center"
            width="75"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.leverage"
                class="edit-input"
                size="mini"
                @blur="edit(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('trade.profitRate')"
            align="center"
            width="75"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.profit"
                class="edit-input"
                size="mini"
                @blur="edit(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('trade.lossRate')"
            align="center"
            width="75"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.loss"
                class="edit-input"
                size="mini"
                @blur="edit(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column :label="$t('trade.enable')" align="center" width="75">
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
            width="75"
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
      </el-tab-pane>
      <el-tab-pane label="USDC" name="USDC">
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
            :label="$t('trade.pin')"
            width="50"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-rate v-model="row.pin_read" :max="1" @change="editPin(row)" />
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
            :label="$t('trade.strategyType')"
            align="center"
            width="115"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.strategy_type" size="mini" @change="edit(scope.row)">
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
            width="115"
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
            width="90"
            show-overflow-tooltip
            prop="percent_change"
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
          <el-select v-model="scope.row.kline_interval" size="mini" @change="edit(scope.row)">
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
            width="125"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.marginType" size="mini" @change="edit(scope.row)">
                <el-option :label="$t('trade.ISOLATED')" value="ISOLATED" />
                <el-option :label="$t('trade.CROSSED')" value="CROSSED" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('trade.usdt')"
            align="center"
            width="75"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.usdt"
                class="edit-input"
                size="mini"
                @blur="edit(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('trade.leverage')"
            align="center"
            width="75"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.leverage"
                class="edit-input"
                size="mini"
                @blur="edit(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('trade.profitRate')"
            align="center"
            width="75"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.profit"
                class="edit-input"
                size="mini"
                @blur="edit(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('trade.lossRate')"
            align="center"
            width="75"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.loss"
                class="edit-input"
                size="mini"
                @blur="edit(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column :label="$t('trade.enable')" align="center" width="75">
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
            width="75"
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
      </el-tab-pane>
    </el-tabs>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="search.page"
      :limit.sync="search.limit"
      @pagination="getFutures"
    />
    <!-- add data -->
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
        label-width="130px"
        style="width: 500px; margin-left:50px;"
      >
        <el-form-item :label="$t('trade.strategyType')" prop="strategyType">
          <el-select v-model="batchInfo.strategyType" clearable size="mini">
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
        <el-form-item :label="$t('trade.strategyTemplate')" prop="strategyTemplates">
          <el-select v-model="batchInfo.strategyTemplateId" clearable size="mini">
            <el-option v-for="item in strategyTemplates" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('trade.marginType')" prop="marginType">
          <el-select v-model="batchInfo.marginType" clearable size="mini">
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
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="mini">
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
                  size="mini"
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
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="mini">
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
                  size="mini"
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
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="mini">
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
                  size="mini"
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
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="mini">
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
                  size="mini"
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
                  size="mini"
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
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="mini">
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
                  size="mini"
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
                  size="mini"
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
        <el-tab-pane label="atr" name="atr">
          <div>
            <el-button type="primary" @click="addAtr">{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :data="technology.atr"
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
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('technology.klineInterval')"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.kline_interval" size="mini">
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
                  size="mini"
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
                  @click="delAtr(scope)"
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
      <div style="display:flex; gap: 10px;">
        <el-button type="primary" @click="addStrategy">{{ $t('table.add') }}</el-button>
        <el-select v-model="batchInfo.strategyTemplateId" clearable size="mini" placeholder="select template" @change="selectStrategyTemplate">
          <el-option v-for="item in strategyTemplates" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
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
              size="mini"
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
              size="mini"
              class="edit-input"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('strategy.fullScreen')"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.fullScreen"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              @change="fullCodeScreenChange(scope.row, scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('strategy.type')"
          align="center"
          width="140"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.type" size="mini">
              <el-option :label="$t('trade.long')" value="long" />
              <el-option :label="$t('trade.short')" value="short" />
              <el-option :label="$t('trade.close_long')" value="close_long" />
              <el-option :label="$t('trade.close_short')" value="close_short" />
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
    <!-- coding -->
    <el-dialog :title="dialogCodeTitle" :visible.sync="dialogCodeVisible" fullscreen @closed="codeScreenClose">
      <div class="code-full" style="width: 100%;">
        <div style="margin-bottom: 10px; display: flex;justify-content: space-between;align-items: center;">
          <div
            style="display: flex;flex-flow: row wrap;gap: 10px; width:75%"
          >
            <el-link href="https://expr-lang.org/docs/language-definition" type="success" target="_blank">code rule</el-link>
          </div>
          <el-button
            type="primary"
            @click="testStrategyRule"
          >{{ $t('table.test') }}
          </el-button>
        </div>
        <codemirror
          ref="cmEditor"
          :value="code"
          :options="cmOptions"
          @ready="onCmReady"
          @focus="onCmFocus"
          @input="onCmCodeChange"
        />
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.code-full .CodeMirror.cm-s-monokai.CodeMirror-wrap {
  min-height: 600px;
}
// 补全弹层
.CodeMirror-hints {
  z-index: 9999;
}
</style>

<script>
import { getFeatures, setFeature, addFeature, delFeature, enableFeature, batchEdit, testStrategyRule } from '@/api/trade'
import { getList } from '@/api/strategy_template'
import Pagination from '@/components/Pagination'
import { round } from 'mathjs'

import CodeMirror from 'codemirror'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js' // 支持JavaScript语言
import 'codemirror/mode/go/go.js' // 支持go语言

import 'codemirror/addon/selection/active-line' // 光标行背景高亮，配置里面也需要styleActiveLine设置为true
import 'codemirror/keymap/sublime' // sublime编辑器效果
import 'codemirror/mode/css/css'
import 'codemirror/theme/monokai.css' // 编辑器主题样式，配置里面theme需要设置monokai
import 'codemirror/theme/base16-dark.css'

// 搜索
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
import 'codemirror/addon/search/jump-to-line.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'

// 折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'

// 括号匹配
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'

// 自动补全
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/anyword-hint.js'

// // 全屏功能 由于项目复杂，自带的全屏功能一般不好使
// import 'codemirror/addon/display/fullscreen.css'
// import 'codemirror/addon/display/fullscreen'

const initTechnology = {
  ma: [],
  ema: [],
  rsi: [],
  kc: [],
  boll: [],
  atr: [],
}

export default {
  components: {
    codemirror,
    Pagination,
  },
  data() {
    return {
      klineInterval: [
        '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M',
      ],
      total: 0,
      allList: [],
      list: [],
      sort: '',
      listLoading: false,
      serviceLoading: false,
      enableLoading: false,
      buyAll: true,
      sellAll: true,
      search: {
        page: 1,
        limit: 50,
        symbol_type: 'USDT',
        symbol: '',
        enable: '',
        margin_type: '',
        pin: '',
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
        strategyType: undefined,
        strategyTemplateId: undefined,
      },
      rowKey(row) {
        return row.symbol + row.id
      },
      expandKeys: [],
      timeId: null,
      interval: 30,

      dialogTechnologyTitle: '',
      dialogTechnologyVisible: false,
      technologySymbolId: 0, // 当前编辑的技术指标对应symbol行的 ID
      technology: JSON.parse(JSON.stringify(initTechnology)),

      dialogStrategyTitle: '',
      dialogStrategyVisible: false,
      strategySymbolId: 0, // 当前编辑的策略对应symbol行的 ID
      strategy: [],

      code: '',
      cmOptions: {
        tabSize: 2,
        mode: 'text/x-go',
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
        hintOptions: {
          completeSingle: false, // 当只有一个补全项时，不自动补全
          hint: this.customHint,
        },
      },
      dialogCodeTitle: '',
      dialogCodeVisible: false,
      strategyIndex: undefined, // 当前编辑的策略索引
      strategyTemplates: [], // 策略模板 {id: 1, name: 'name', 'strategy': '', 'technology': ''}
      copyTechnology: '', // 模板复制的技术指标
    }
  },
  computed: {
    allProfit() {
      const profit = this.list.reduce(
        (carry, row) => carry + row.nowProfit,
        0,
      )
      return round(profit, 2)
    },
  },
  activated() {
    this.interval = localStorage.getItem('refreshInterval') || 30
    this.fetchData()
  },
  deactivated() {
    clearInterval(this.timeId)
  },
  async created() {
    this.getStrategyTemplates()
    this.search = Object.assign(this.search, this.$route.query)
    this.search.page = parseInt(this.search.page) || 1
    this.search.limit = parseInt(this.search.limit) || 50
    this.interval = localStorage.getItem('refreshInterval') || 30
    await this.fetchData()
  },
  beforeDestroy() {
    clearInterval(this.timeId)
  },
  methods: {
    async getStrategyTemplates() {
      const { data } = await getList()
      this.strategyTemplates = data
    },
    customHint(cm) {
      const cur = cm.getCursor()
      const token = cm.getTokenAt(cur)
      const start = token.start
      const end = token.end
      const word = token.string

      const hints = this.getHints(word)

      const hintObj = {
        list: hints.map(hint => ({ text: hint })),
        from: CodeMirror.Pos(cur.line, start),
        to: CodeMirror.Pos(cur.line, end),
      }

      return hintObj
    },
    getHints(word) {
      const keywords = [
        'type', 'float', 'int', 'string', // type
        'let', 'trim', 'upper', 'lower', 'split', 'replace', 'repeat', 'indexOf', 'hasPrefix', 'now()',
        'max', 'min', 'abs', 'ceil', 'floor', 'round', // number
        'all', 'any', 'one', 'none', 'map', 'filter', 'find', 'findIndex', 'findLast', 'groupBy', 'count', 'concat', 'join', 'reduce', 'sum', 'mean', 'median', 'first', 'last', 'take', 'reverse', 'sort', 'sortBy', // array
        'keys', 'values', 'len',
        'Kdj', 'IsDesc', 'IsAsc', // function
        'SystemStartTime', 'NowPrice', 'NowTime', 'NowSymbolPercentChange', 'NowSymbolClose', 'NowSymbolOpen', 'NowSymbolLow', 'NowSymbolHigh', 'BasicTrend', // symbol
        'ROI', 'Position', 'Position.EntryPrice', 'Position.MarkPrice', 'Position.Amount', 'Position.UnrealizedProfit', 'Position.Leverage', 'Position.Side', 'Position.Mock', 'Position.CreateTime', 'Position.SourceType', // position
      ]
      if (this.strategySymbolId !== undefined) {
        const find = this.list.find(item => item.id === this.strategySymbolId)
        if (find) {
          let technology = {}
          try {
            technology = JSON.parse(find.technology)
          } catch (e) {
            technology = {}
          }
          const klineIntervalMap = new Set()
          Object.keys(technology).forEach(key => {
            technology[key].forEach(item => {
              if (item.enable) {
                keywords.push(item.name)
                if (item.kline_interval) {
                  klineIntervalMap.add(item.kline_interval)
                }
                switch (key) {
                  case 'ma':
                  case 'ema':
                  case 'rsi':
                  case 'atr':
                    keywords.push(`${item.name}.KlineInterval`)
                    keywords.push(`${item.name}.Period`)
                    keywords.push(`${item.name}.Data`)
                    keywords.push(`${item.name}.Data[]`)
                    break
                  case 'kc':
                    keywords.push(`${item.name}.KlineInterval`)
                    keywords.push(`${item.name}.Period`)
                    keywords.push(`${item.name}.Multiplier`)
                    keywords.push(`${item.name}.High`)
                    keywords.push(`${item.name}.High[]`)
                    keywords.push(`${item.name}.Low`)
                    keywords.push(`${item.name}.Low[]`)
                    keywords.push(`${item.name}.Mid`)
                    keywords.push(`${item.name}.Mid[]`)
                    break
                  case 'boll':
                    keywords.push(`${item.name}.KlineInterval`)
                    keywords.push(`${item.name}.Period`)
                    keywords.push(`${item.name}.StdDevMultiplier`)
                    keywords.push(`${item.name}.High`)
                    keywords.push(`${item.name}.High[]`)
                    keywords.push(`${item.name}.Low`)
                    keywords.push(`${item.name}.Low[]`)
                    keywords.push(`${item.name}.Mid`)
                    keywords.push(`${item.name}.Mid[]`)
                    break
                }
              }
            })
          })
          klineIntervalMap.forEach(item => {
            keywords.push(`kline_${item}`)
            keywords.push(`kline_${item}.High`)
            keywords.push(`kline_${item}.High[]`)
            keywords.push(`kline_${item}.Low`)
            keywords.push(`kline_${item}.Low[]`)
            keywords.push(`kline_${item}.Close`)
            keywords.push(`kline_${item}.Close[]`)
            keywords.push(`kline_${item}.Open`)
            keywords.push(`kline_${item}.Open[]`)
            keywords.push(`kline_${item}.Amount`)
            keywords.push(`kline_${item}.Amount[]`)
            keywords.push(`kline_${item}.Qps`)
            keywords.push(`kline_${item}.Qps[]`)
          })
        }
      }

      for (const keyword of ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT']) {
        keywords.push(`${keyword}.PercentChange`)
        keywords.push(`${keyword}.Close`)
        keywords.push(`${keyword}.Open`)
        keywords.push(`${keyword}.Low`)
        keywords.push(`${keyword}.High`)
      }

      const suggestions = []
      for (const keyword of keywords) {
        if (keyword.startsWith(word)) {
          suggestions.push(keyword)
        }
      }
      return suggestions
    },
    fullCodeScreenChange(row, index) {
      if (row.fullScreen) {
        this.dialogCodeTitle = `${row.name} code`
        this.code = row.code
        this.strategyIndex = index
        this.dialogCodeVisible = true
      } else {
        this.code = ''
        this.strategyIndex = undefined
        this.dialogCodeVisible = false
      }
    },
    codeScreenClose() {
      if (this.strategyIndex !== undefined) {
        this.strategy[this.strategyIndex].fullScreen = false
        this.strategy = [...this.strategy]
        this.code = ''
        this.strategyIndex = undefined
        this.dialogCodeVisible = false
      }
    },
    async testStrategyRule() {
      try {
        const res = await testStrategyRule(this.strategySymbolId, { strategy: JSON.stringify([
          {
            name: 'test_strategy',
            type: this.strategy[this.strategyIndex]?.type || 'long',
            code: this.code,
            fullScreen: false,
            enable: true,
          },
        ]) })
        if (res.code === 200) {
          this.$message({ message: `result: ${res?.data?.pass}`, type: 'success' })
        }
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'error' })
      }
    },
    onCmReady(cm) {
      // console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      // console.log('the editor is focused!', cm)
    },
    onCmCodeChange(newCode) {
      // console.log('this is new code', newCode)
      this.code = newCode
      if (this.strategyIndex !== undefined) {
        this.strategy[this.strategyIndex].code = newCode
        this.strategy = [...this.strategy]
      }
    },
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
      const { prop, order } = data
      if (!order) {
        this.sort = ''
      } else {
        this.sort = prop + (order === 'ascending' ? '+' : '-')
      }
      this.fetchData()
    },
    handleTabClick(tab) {
      this.search.symbol_type = tab.name
      this.search.page = 1
      this.fetchData()
    },
    async fetchData() {
      clearInterval(this.timeId)
      // this.listLoading = true
      this.getFutures()
      this.replaceUrl()
      this.timeId = setInterval(() => this.getFutures(), this.interval * 1000)
      // this.listLoading = false
    },
    async getFutures() {
      const search = this.search
      search.symbol = search.symbol.trim().toUpperCase()
      const { data: { list, total }} = await getFeatures({ sort: this.sort, ...search })
      this.list = list.map(item => {
        const { pin, enable, ...other } = item
        return { enable: enable > 0, pin_read: pin, pin, ...other }
      })
      this.total = total
    },
    replaceUrl: function() {
      this.$router.push({
        path: this.$route.path, // 保持当前路径不变
        query: {
          ...this.search,
        },
      })
    },
    // getPageList() {
    //   const search = this.search
    //   this.list = this.allList.slice((search.page - 1) * search.limit, search.page * search.limit)
    // },
    async editPin(row) {
      if (row.pin_read && !row.pin) {
        row.pin = 1
      } else if (row.pin_read && row.pin) {
        row.pin_read = 0
        row.pin = 0
      }
      try {
        await setFeature(row.id, { pin: row.pin })
        this.$message({ message: this.$t('table.editSuccess'), type: 'success' })
        await this.fetchData()
      } catch (e) {
        this.$message({ message: this.$t('table.editFail'), type: 'success' })
      }
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
        'updateTime': +new Date(),
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
          strategyType: undefined,
          strategyTemplateId: undefined,
        }
        this.dialogFormVisible2 = false
        await this.fetchData()
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'success' })
      }
    },
    async openTechnologyDialog(row) {
      this.copyTechnology = ''
      this.technologySymbolId = row.id
      if (row.technology) {
        try {
          this.technology = {
            ...JSON.parse(JSON.stringify(initTechnology)),
            ...JSON.parse(row.technology),
          }
        } catch (e) {
          this.technology = JSON.parse(JSON.stringify(initTechnology))
        }
      } else {
        this.technology = JSON.parse(JSON.stringify(initTechnology))
      }
      this.dialogTechnologyTitle = `${row.symbol} ${this.$t('trade.technology')}`
      this.dialogTechnologyVisible = true
    },
    async openStrategyDialog(row) {
      this.copyTechnology = ''
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
        const data = {
          strategy: JSON.stringify(this.strategy),
        }
        console.log(this.copyTechnology)
        if (this.copyTechnology) {
          data.technology = this.copyTechnology
        }
        await setFeature(this.strategySymbolId, data)
        this.copyTechnology = ''
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
          enable: false,
        },
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
          enable: false,
        },
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
          enable: false,
        },
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
          enable: false,
        },
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
          enable: false,
        },
      ]
    },
    delBoll(scope) {
      this.technology.boll = this.technology.boll.filter((item, index) => index !== scope.$index)
    },
    addAtr() {
      this.technology.atr = [
        ...this.technology.atr,
        {
          name: '',
          kline_interval: '',
          period: 14,
          enable: false,
        },
      ]
    },
    delAtr(scope) {
      this.technology.atr = this.technology.atr.filter((item, index) => index !== scope.$index)
    },

    addStrategy() {
      this.strategy = [
        ...this.strategy,
        {
          name: '',
          type: '',
          code: '',
          fullScreen: false,
          enable: false,
        },
      ]
    },
    delStrategy(scope) {
      this.strategy = this.strategy.filter((item, index) => index !== scope.$index)
    },
    selectStrategyTemplate(id) {
      const find = this.strategyTemplates.find(item => item.id === id)
      if (find) {
        try {
          this.strategy = JSON.parse(find.strategy)
          this.copyTechnology = find.technology
        } catch (e) {
          this.$message({ message: 'template error', type: 'error' })
        }
      }
    },
  },
}
</script>
