<template>
  <div class="dashboard-container">
    <el-collapse v-loading="loading" :value="['futures', 'spot', 'delivery', 'new_coin_rush', 'debug', 'external']">
      <el-collapse-item name="futures">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('route.futuresTrade') }}: </span>
            <el-switch
              v-model="config.tradeFutureEnable"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              :active-value="1"
              :inactive-value="0"
              @change="editConfig($event, 'future_enable')"
            />
          </div>
        </template>
        <div class="dashboard-text">
          <div style="margin-left:20px;">
            <div class="dashboard-text">
              <span>{{ $t('showPage.websocket') }}: </span>
              <el-switch
                :value="config.wsFuturesEnable"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                :active-value="1"
                :inactive-value="0"
                @change="editConfig($event, 'ws_futures_enable')"
              />
              <span class="green" style="margin-left: 20px;">{{ $t('showPage.autoUpdatePrice') }}</span>
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.futuresPositionConvertEnable') }}: </span>
              <el-switch
                :value="config.futuresPositionConvertEnable"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                :active-value="1"
                :inactive-value="0"
                @change="editConfig($event, 'futures_position_convert_enable')"
              />
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.allowLong') }}: </span>
              <el-switch
                :value="config.coinAllowLong"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                :active-value="1"
                :inactive-value="0"
                @change="editConfig($event, 'future_allow_long')"
              />
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.allowShort') }}: </span>
              <el-switch
                v-model="config.coinAllowShort"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                :active-value="1"
                :inactive-value="0"
                @change="editConfig($event, 'future_allow_short')"
              />
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.strategyTrade') }}: </span>
              <el-select v-model="config.tradeStrategyTrade" style="width:100px;" size="small" @change="editConfig($event, 'future_strategy_trade')">
                <el-option :label="$t('strategyType.line1')" value="line1" />
                <el-option :label="$t('strategyType.line2')" value="line2" />
                <el-option :label="$t('strategyType.line3')" value="line3" />
                <el-option :label="$t('strategyType.line4')" value="line4" />
                <el-option :label="$t('strategyType.line5')" value="line5" />
                <el-option :label="$t('strategyType.line6')" value="line6" />
                <el-option :label="$t('strategyType.line7')" value="line7" />
              </el-select>
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.strategyCoin') }}: </span>
              <el-select v-model="config.tradeStrategyCoin" style="width:100px;" size="small" @change="editConfig($event, 'future_strategy_coin')">
                <el-option :label="$t('coin1')" value="coin1" />
                <el-option :label="$t('coin2')" value="coin2" />
                <el-option :label="$t('coin3')" value="coin3" />
                <el-option :label="$t('coin4')" value="coin4" />
                <el-option :label="$t('coin5')" value="coin5" />
                <el-option :label="$t('coin6')" value="coin6" />
              </el-select>
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.positionMaxCount') }}: </span>
              <el-input v-model="config.coinMaxCount" type="number" style="width:75px;" @change="editConfig($event, 'future_max_count')" />
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.excludeSymbols') }}: </span>
              <el-input v-model="config.coinExcludeSymbols" type="textarea" :rows="2" style="width:75%;" @change="editConfig($event, 'future_exclude_symbols')" />
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.orderType') }}: </span>
              <el-select v-model="config.coinOrderType" style="width:100px;" size="small" @change="editConfig($event, 'future_order_type')">
                <el-option :label="$t('MARKET')" value="MARKET" />
                <el-option :label="$t('LIMIT')" value="LIMIT" />
              </el-select>
              <span class="green" style="margin-left: 20px;">{{ config.coinOrderType === 'LIMIT' ? $t('showPage.limitOrderType') : $t('showPage.marketOrderType') }}</span>
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.testStrategy') }}: </span>
              <el-switch
                :value="config.tradeFutureTest"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                :active-value="1"
                :inactive-value="0"
                @change="editConfig($event, 'future_test')"
              />
              <el-button
                v-if="config.tradeFutureTest"
                style="margin-left:10px;"
                type="success"
                size="mini"
                @click="$router.push({ name: 'testStrategyResult' })"
              >
                {{ $t('route.testStrategyResult') }}
              </el-button>
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.testStrategyNoticeLimitMin') }}: </span>
              <el-input v-model="config.tradeFutureTestNoticeLimitMin" type="number" style="width:75px;" @change="editConfig($event, 'future_test_notice_limit_min')" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="spot">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('route.spotsTrade') }}({{ $t('trade.notYet') }}): </span>
            <el-switch
              v-model="config.tradeSpotEnable"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              :active-value="1"
              :inactive-value="0"
              @change="editConfig($event, 'spot_enable')"
            />
          </div>
        </template>
        <div class="dashboard-text">
          <div style="margin-left:20px;">
            <div class="dashboard-text">
              <span>{{ $t('showPage.websocket') }}: </span>
              <el-switch
                :value="config.wsSpotEnable"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                :active-value="1"
                :inactive-value="0"
                @change="editConfig($event, 'ws_spot_enable')"
              />
              <span class="green" style="margin-left: 20px;">{{ $t('showPage.autoUpdatePrice') }}</span>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="delivery">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('route.deliveryTrade') }}({{ $t('trade.notYet') }}): </span>
            <el-switch
              v-model="config.tradeDeliveryEnable"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              :active-value="1"
              :inactive-value="0"
              @change="editConfig($event, 'delivery_enable')"
            />
          </div>
        </template>
        <div class="dashboard-text">
          <div style="margin-left:20px;">
            <div class="dashboard-text">
              <span>{{ $t('showPage.websocket') }}: </span>
              <el-switch
                :value="config.wsDeliveryEnable"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                :active-value="1"
                :inactive-value="0"
                @change="editConfig($event, 'ws_delivery_enable')"
              />
              <span class="green" style="margin-left: 20px;">{{ $t('showPage.autoUpdatePrice') }}</span>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="new_coin_rush">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('route.newCoinRush') }}: </span>
          </div>
        </template>
        <div class="dashboard-text">
          <div style="margin-left:20px;">
            <div class="dashboard-text">
              <span>{{ $t('route.newSpotRush') }}: </span>
              <el-switch
                v-model="config.spotNewEnable"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                :active-value="1"
                :inactive-value="0"
                @change="editConfig($event, 'spot_new_enable')"
              />
            </div>
            <div class="dashboard-text">
              <span>{{ $t('route.newFuturesRush') }}: </span>
              <el-switch
                v-model="config.tradeNewEnable"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                :active-value="1"
                :inactive-value="0"
                @change="editConfig($event, 'future_new_enable')"
              />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="coin_notice">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('route.coinNotice') }}: </span>
            <el-switch
              v-model="config.noticeCoinEnable"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              :active-value="1"
              :inactive-value="0"
              @change="editConfig($event, 'notice_coin_enable')"
            />
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="market_listen">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('route.marketListen') }}: </span>
            <el-switch
              v-model="config.listenCoinEnable"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              :active-value="1"
              :inactive-value="0"
              @change="editConfig($event, 'listen_coin_enable')"
            />
          </div></template>
      </el-collapse-item>
      <el-collapse-item name="funding_rate">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('route.fundingRate') }}: </span>
            <el-switch
              v-model="config.listenFundingRate"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              :active-value="1"
              :inactive-value="0"
              @change="editConfig($event, 'listen_funding_rate_enable')"
            />
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="debug">
        <template slot="title">
          <div class="dashboard-text">
            <span>debug: </span>
            <span v-if="config.debug === '1'" class="red">{{ $t('showPage.open') }}</span>
            <span v-else class="green">{{ $t('showPage.close') }}</span>
          </div>
        </template>
        <div class="dashboard-text">
          <div style="margin-left:20px;">
            <div class="dashboard-text">
              <el-button size="mini" type="primary" @click="testPusher">{{ $t('showPage.testPusher') }}</el-button>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="external">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('showPage.externalLinks') }}: </span>
          </div>
        </template>
        <div class="dashboard-text">
          <div style="margin-left:20px;display:flex;gap: 20px;">
            <el-link v-for="link in config.externalLinks" :key="link.title" type="primary" :underline="false" :href="link.url" target="_blank" style="font-size:30px;">
              {{ link.title }}
            </el-link>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getServiceConfig, editData, testPusher } from '@/api/service'

export default {
  name: 'Dashboard',
  data() {
    return {
      loading: false,
      config: {
        'debug': '0',
        'coinAllowLong': 1,
        'coinAllowShort': 0,
        'coinExcludeSymbols': '',
        'coinMaxCount': 0,
        'coinOrderType': '',
        'externalLinks': [],
        'listenCoinEnable': 0,
        'listenFundingRate': 0,
        'noticeCoinEnable': 0,
        'spotNewEnable': 0,
        'tradeFutureTest': 0,
        'tradeFutureTestNoticeLimitMin': 0,
        'tradeFutureEnable': 0,
        'tradeSpotEnable': 0,
        'tradeDeliveryEnable': 0,
        'tradeNewEnable': 0,
        'tradeStrategyCoin': '',
        'tradeStrategyTrade': '',
        wsFuturesEnable: 0,
        wsSpotEnable: 0,
        wsDeliveryEnable: 0,
        futuresPositionConvertEnable: 0,
      },
    }
  },
  async created() {
    await this.fetchConfig()
  },
  methods: {
    async fetchConfig() {
      const { data } = await getServiceConfig()
      try {
        data.externalLinks = JSON.parse(data.externalLinks)
      } catch (error) {
        data.externalLinks = []
      }
      this.config = data
    },
    async editConfig(value, field) {
      this.loading = true
      try {
        if (field === 'future_max_count' || field === 'future_test_notice_limit_min') {
          value = Number(value)
        }
        await editData({
          [field]: value,
        })
        await this.fetchConfig()
        this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'error' })
      } finally {
        this.loading = false
      }
    },
    async testPusher() {
      try {
        await testPusher()
        this.$message({ message: this.$t('table.actionSuccess'), type: 'success' })
      } catch (e) {
        this.$message({ message: this.$t('table.actionFail'), type: 'error' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin-left: 20px;
  }
  &-text {
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 20px;
  }
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>
