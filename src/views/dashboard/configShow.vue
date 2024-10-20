<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <span>{{ $t('route.futuresTrade') }}: </span>
      <span v-if="config.tradeFutureEnable === '1'" class="green">{{ $t('showPage.open') }}</span>
      <span v-else class="red">{{ $t('showPage.close') }}</span>
      <div style="margin-left:20px;">
        <div class="dashboard-text">
          <span>{{ $t('showPage.allowLong') }}: </span>
          <span v-if="config.coinAllowLong" class="green">{{ $t('showPage.open') }}</span>
          <span v-else class="red">{{ $t('showPage.close') }}</span>
        </div>
        <div class="dashboard-text">
          <span>{{ $t('showPage.allowShort') }}: </span>
          <span v-if="config.coinAllowShort" class="green">{{ $t('showPage.open') }}</span>
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
    <div class="dashboard-text">
      <span>{{ $t('route.newCoinRush') }}: </span>
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
    <div class="dashboard-text">
      <span>{{ $t('route.coinNotice') }}: </span>
      <span v-if="config.noticeCoinEnable === '1'" class="green">{{ $t('showPage.open') }}</span>
      <span v-else class="red">{{ $t('showPage.close') }}</span>
    </div>
    <div class="dashboard-text">
      <span>{{ $t('route.marketListen') }}: </span>
      <span v-if="config.listenCoinEnable === '1'" class="green">{{ $t('showPage.open') }}</span>
      <span v-else class="red">{{ $t('showPage.close') }}</span>
    </div>
    <div class="dashboard-text">
      <span>{{ $t('route.fundingRate') }}: </span>
      <span v-if="config.listenFundingRate === '1'" class="green">{{ $t('showPage.open') }}</span>
      <span v-else class="red">{{ $t('showPage.close') }}</span>
    </div>
    <div class="dashboard-text">
      <span>debug: </span>
      <span v-if="config.debug === '1'" class="red" />
      <span v-else class="green">{{ $t('showPage.close') }}</span>
    </div>
    <div class="dashboard-text">
      <span>{{ $t('showPage.externalLinks') }}: </span>
      <div style="margin-left:20px;display:flex;gap: 20px;">
        <el-link v-for="link in config.externalLinks" :key="link.title" type="primary" :underline="false" :href="link.url" target="_blank" style="font-size:30px;">
          {{ link.title }}
        </el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getServiceConfig } from '@/api/service'

export default {
  name: 'Dashboard',
  data() {
    return {
      config: {}
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
      console.log(data)
      this.config = data
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>
