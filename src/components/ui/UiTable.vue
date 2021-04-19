<template>
  <div class="ui-table">
    <template v-if="table.body">
      <div v-if="table.head" class="ui-table__head">
        <div
          v-for="(item, i) in table.head"
          :key="i"
          class="ui-table__head-cell"
          @click="onSort(item)"
        >
          {{ item }}
        </div>
      </div>

      <div v-if="table.body" class="ui-table__body">
        <div v-for="(row, i) in table.body" :key="i" class="ui-table__body-row">
          <slot name="row" v-bind="{ row }"></slot>
        </div>
      </div>
    </template>

    <template v-if="!table.body && !loading">
      <div class="ui-table__holder">No data</div>
    </template>

    <template v-if="!table.body && loading">
      <div class="ui-table__holder">Loading...</div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    table: {
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onSort(value) {
      this.$emit("sort", value);
    },
  },
};
</script>

<style lang="scss">
.ui-table {
  position: relative;
  display: block;
  border-radius: 4px;
  border: 1px solid rgba(grey, 0.2);
  margin: 40px 0;

  &__head {
    display: flex;
    justify-content: space-between;
    background: rgba(grey, 0.1);
    user-select: none;

    &-cell {
      flex: 1;
      padding: 10px 20px;
      font-weight: 600;
      text-align: center;
      text-transform: capitalize;
      cursor: pointer;

      &:first-of-type {
        text-align: left;
      }

      &:last-of-type {
        text-align: right;
      }
    }
  }

  &__body {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    &-row {
      display: flex;

      &:not(:last-of-type) {
        border-bottom: 1px solid rgba(grey, 0.2);
      }
    }

    &-cell {
      flex: 1;
      padding: 10px 20px;
      text-align: center;

      &:first-of-type {
        text-align: left;
      }

      &:last-of-type {
        text-align: right;
      }

      &.red {
        color: red;
      }

      &.green {
        color: green;
      }
    }
  }

  &__holder {
    height: 100px;
    padding: 20px;
  }
}
</style>
