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
      highlight-current-row
    >
      <el-table-column
        :label="$t('notifyConfig.channel')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.channel }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('notifyConfig.module')"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ $t('notifyConfig.' + scope.row.module) }}
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
            @change="enable($event, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="180"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            type="success"
            size="mini"
            @click="editDialog(row)"
          >{{ $t('table.edit') }}</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="del(row)"
          >{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="info"
        label-position="left"
        label-width="120px"
        style="width: 550px; margin-left:50px;"
      >
        <el-form-item :label="$t('notifyConfig.channel')" prop="channel">
          <el-select v-model="info.channel">
            <el-option :label="$t('dingding')" value="dingding" />
            <el-option :label="$t('slack')" value="slack" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('notifyConfig.module')" prop="module">
          <el-select v-model="info.module">
            <el-option :label="$t('notifyConfig.futures')" value="futures" />
            <el-option :label="$t('notifyConfig.futures_test')" value="futures_test" />
            <el-option :label="$t('notifyConfig.futures_position_convert')" value="futures_position_convert" />
            <el-option :label="$t('notifyConfig.coin_notice')" value="coin_notice" />
            <el-option :label="$t('notifyConfig.coin_listen')" value="coin_listen" />
            <el-option :label="$t('notifyConfig.funding_rate')" value="funding_rate" />
            <el-option :label="$t('notifyConfig.new_coin_rush')" value="new_coin_rush" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="info.channel === 'dingding'" :label="$t('notifyConfig.dingding_token')" prop="dingding_token">
          <el-input v-model="info.dingding_token" style="width: 500px" />
        </el-form-item>
        <el-form-item v-if="info.channel === 'dingding'" :label="$t('notifyConfig.dingding_word')" prop="dingding_word">
          <el-input v-model="info.dingding_word" style="width: 200px" />
        </el-form-item>
        <el-form-item v-if="info.channel === 'slack'" :label="$t('notifyConfig.slack_token')" prop="slack_token">
          <el-input v-model="info.slack_token" style="width: 500px" />
        </el-form-item>
        <el-form-item v-if="info.channel === 'slack'" :label="$t('notifyConfig.slack_channel_id')" prop="slack_channel_id">
          <el-input v-model="info.slack_channel_id" style="width: 200px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" :loading="dialogLoading" @click="info.id ? edit(info) : addConfig(info)">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getNotifyConfigs, setNotifyConfig, addNotifyConfig, delNotifyConfig } from '@/api/notifyConfig'

export default {
  data() {
    return {
      list: [],
      sort: '+',
      listLoading: false,
      timeId: null,
      dialogFormVisible: false,
      dialogLoading: false,
      dialogTitle: '新增通知配置',
      info: {},
    }
  },
  async created() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      // this.listLoading = true
      const { data } = await getNotifyConfigs()
      this.list = data.map(item => ({ ...item, enable: item.enable > 0 }))
      // this.listLoading = false
    },
    async edit(row) {
      const { id, enable, ...data } = row
      try {
        await setNotifyConfig(id, { ...data, enable: enable ? 1 : 0 })
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
            await delNotifyConfig(row.id)
            this.$message({ message: this.$t('table.deleteSuccess'), type: 'success' })
            await this.fetchData()
          } catch (e) {
            this.$message({ message: this.$t('table.deleteFail'), type: 'success' })
          }
        })
        .catch(() => {})
    },
    async enable(event, row) {
      await this.edit(row)
    },
    openDialog() {
      this.dialogTitle = this.$t('table.add')
      this.dialogFormVisible = true
    },
    editDialog(row) {
      this.info = { ...row }
      this.dialogTitle = this.$t('table.edit')
      this.dialogFormVisible = true
    },
    async addConfig(row) {
      const data = {
        ...row,
        'type': 1, // 币币交易
        'createTime': +new Date(),
        'updateTime': +new Date(),
      }
      await addNotifyConfig(data)
      await this.fetchData()
      this.dialogFormVisible = false
    },
  },
}
</script>
