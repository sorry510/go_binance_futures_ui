<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ $t(title) }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ $t(title) }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'settings.sidebarLogo',
      logo: 'data:image/png;base64,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'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
