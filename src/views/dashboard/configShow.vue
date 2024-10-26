<template>
  <div class="dashboard-container">
    <el-collapse :value="['1', '2', '6']">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('route.futuresTrade') }}: </span>
            <span v-if="config.tradeFutureEnable === '1'" class="green">{{ $t('showPage.open') }}</span>
            <span v-else class="red">{{ $t('showPage.close') }}</span>
          </div>
        </template>
        <div class="dashboard-text">
          <div style="margin-left:20px;">
            <div class="dashboard-text">
              <span>{{ $t('showPage.allowLong') }}: </span>
              <span v-if="config.coinAllowLong === '1'" class="green">{{ $t('showPage.open') }}</span>
              <span v-else class="red">{{ $t('showPage.close') }}</span>
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.allowShort') }}: </span>
              <span v-if="config.coinAllowShort === '1'" class="green">{{ $t('showPage.open') }}</span>
              <span v-else class="red">{{ $t('showPage.close') }}</span>
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.strategyTrade') }}: </span>
              <span class="green">{{ config.tradeStrategyTrade }}</span>
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.strategyCoin') }}: </span>
              <span class="green">{{ config.tradeStrategyCoin }}</span>
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.positionMaxCount') }}: </span>
              <span class="green">{{ config.coinMaxCount }}</span>
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.excludeSymbols') }}: </span>
              <span class="green">{{ config.coinExcludeSymbols }}</span>
            </div>
            <div class="dashboard-text">
              <span>{{ $t('showPage.orderType') }}: </span>
              <span class="green">{{ config.coinOrderType === 'LIMIT' ? $t('showPage.limitOrderType') : $t('showPage.marketOrderType') }}</span>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('route.newCoinRush') }}: </span>
          </div>
        </template>
        <div class="dashboard-text">
          <div style="margin-left:20px;">
            <div class="dashboard-text">
              <span>{{ $t('route.newSpotRush') }}: </span>
              <span v-if="config.spotNewEnable === '1'" class="green">{{ $t('showPage.open') }}</span>
              <span v-else class="red">{{ $t('showPage.close') }}</span>
            </div>
            <div class="dashboard-text">
              <span>{{ $t('route.newFuturesRush') }}: </span>
              <span v-if="config.tradeNewEnable === '1'" class="green">{{ $t('showPage.open') }}</span>
              <span v-else class="red">{{ $t('showPage.close') }}</span>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('route.coinNotice') }}: </span>
            <span v-if="config.noticeCoinEnable === '1'" class="green">{{ $t('showPage.open') }}</span>
            <span v-else class="red">{{ $t('showPage.close') }}</span>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('route.marketListen') }}: </span>
            <span v-if="config.listenCoinEnable === '1'" class="green">{{ $t('showPage.open') }}</span>
            <span v-else class="red">{{ $t('showPage.close') }}</span>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template slot="title">
          <div class="dashboard-text">
            <span>{{ $t('route.fundingRate') }}: </span>
            <span v-if="config.listenFundingRate === '1'" class="green">{{ $t('showPage.open') }}</span>
            <span v-else class="red">{{ $t('showPage.close') }}</span>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template slot="title">
          <div class="dashboard-text">
            <span>debug: </span>
            <span v-if="config.debug === '1'" class="red" />
            <span v-else class="green">{{ $t('showPage.close') }}</span>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="6">
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
import { getServiceConfig } from '@/api/service'

export default {
  name: 'Dashboard',
  data() {
    return {
      config: {
        'coinAllowLong': '0',
        'coinAllowShort': '0',
        'coinExcludeSymbols': '',
        'coinMaxCount': '3',
        'coinOrderType': '',
        'debug': '0',
        'externalLinks': [],
        'listenCoinEnable': '0',
        'listenFundingRate': '0',
        'noticeCoinEnable': '0',
        'spotNewEnable': '0',
        'tradeFutureEnable': '0',
        'tradeNewEnable': '0',
        'tradeStrategyCoin': '',
        'tradeStrategyTrade': ''
      }
    }
  },
  async created() {
    await this.fetchConfig()
  },
  activated() {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin-left: 20px;
  }
  &-text {
    margin-top: 2px;
    font-size: 14px;
    line-height: 18px;
  }
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>
