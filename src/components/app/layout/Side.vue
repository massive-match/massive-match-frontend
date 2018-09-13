<template>
    <div class="side">
      <el-row>
        <el-col :span="24">
          <el-menu
            :collapse="isCollapse"
            :default-active="active"
            class="el-menu-vertical"
            background-color="#F4F4F4"
            text-color="#707070"
            active-text-color="#FFFFFF"
            unique-opened>
            <div v-for="item in menu"
              :key="item.title">
                <el-menu-item
                  :index="item.route.name"
                  @click="setRoute(item.route)"
                  v-if="!item.childrens">
                  <i :class="item.icon"/>
                  <span slot="title" class="menu-item-title"> {{ item.title }}</span>
                </el-menu-item>
                <el-submenu
                  :index="item.title"
                  v-if="item.childrens">
                  <template slot="title">
                    <i :class="item.icon"/>
                    <span class="menu-item-title"> {{ item.title }}</span>
                  </template>
                  <el-menu-item
                    v-for="el in item.childrens"
                    :class="el.label"
                    :key="el.title"
                    :index="setIndex(el)"
                    @click="setRoute(el.route)">
                    <span> {{ el.title }}</span>
                  </el-menu-item>
                </el-submenu>
            </div>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>

<script>
/*
  FIXME:
    - Agregar estilo al boton de geocodificacion mientras este activo.
*/
import menu from './menu';

export default {
  data() {
    return {
      menu,
      active: '1',
      isCollapse: true,
    };
  },
  methods: {
    setActive() {
      if (this.$route.query.mode) {
        this.active = `${this.$route.name}-${this.$route.query.mode}`;
      } else {
        this.active = this.$route.name;
      }
    },
    setRoute({ name, mode = 0 }) {
      if (this.$route.name === name) {
        if (mode !== 0) {
          this.$router.replace({ query: { mode } });
        }
      } else if (mode !== 0) {
        this.$router.push({ name, query: { mode } });
      } else {
        this.$router.push({ name });
      }
    },
    setIndex(el) {
      if (el.route.mode) {
        return `${el.route.name}-${el.route.mode}`;
      }
      return el.route.name;
    },
  },
  beforeMount() {
    this.setActive();
  },
  watch: {
    '$route.name': function check() {
      this.setActive();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/_var";
.side {
  background-color: $fb-white-2;
  box-shadow: 2px 0 4px 0 rgba(0,0,0,0.24);
  padding-top: 60px;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 221px;
  height: 58px;
  text-align: left;
}
.el-menu-item:not(.last) {
  border-bottom: 0.1px solid rgb(223, 223, 223);
}
.el-menu-item:hover {
  background-color: transparent !important;
}
.el-menu-item.is-active {
  background-color: $fb-green-1 !important;
}
.el-submenu {
  li.el-menu-item {
    background-color: $fb-black-2 !important;
    border: 0;
  }
  li.el-menu-item.is-active {
    color: $fb-green-1 !important;
  }
}
.shape {
  width: 23px;
  height: 23px;
  font-size: 18px;
}
.menu-item-title {
  text-transform: uppercase;
}
</style>
