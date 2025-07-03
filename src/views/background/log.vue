<template>
  <div style="width: 100%; height: 100%;">
    <ul v-infinite-scroll="fetchLog" class="infinite-list logs" style="overflow:auto">
      <li v-for="(log, index) in logs" :key="index" class="infinite-list-item">
        {{ log }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getLog } from '@/api/service'

export default {
  name: 'Log',
  data() {
    return {
      loading: false,
      logs: [],
    }
  },
  async created() {
    // setInterval(() => {
    this.fetchLog()
    // }, 5000)
  },
  methods: {
    async fetchLog() {
      const res = await getLog()
      const newLogs = res.split('\n')
      this.logs = newLogs
      // if (lastIndex === -1) {
      //   this.logs = newLogs
      // } else {
      //   // If the first log already exists, append the new logs after the last index
      //   const oldLogs = this.logs.slice(0, lastIndex)
      //   const newLogEntries = newLogs // Exclude the first log which is already in oldLogs
      //   this.logs = [...oldLogs, ...newLogEntries]
      // }
    },
    // findLogIndex(oldLogs, log) {
    //   for (let i = 0; i < oldLogs.length; i++) {
    //     if (oldLogs[i].includes(log)) {
    //       return i
    //     }
    //   }
    //   return -1
    // },
  },
}
</script>

<style lang="scss" scoped>
.logs {
  width: 98%;
  max-height: calc(100vh - 120px); // Adjust height based on your layout
  list-style: none;
  background: #000;
  color: #fff;
  padding: 10px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 10px 15px 0 20px;
}
</style>
