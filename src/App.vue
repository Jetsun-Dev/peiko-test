<template>
  <div id="app" class="home">
    <img alt="Vue logo" src="./assets/peiko-logo-mini.png">
    <h1>Test</h1>
    <hr>

    <section class="home__stats">
      <ui-button @click="getTableData">
        Get data
      </ui-button>

      <ui-table :table="table" :loading="isLoading" @sort="onSort" class="home__table">
        <template #row="{ row }">
          <div class="ui-table__body-cell">
              {{ row.stock }}
          </div>

          <div class="ui-table__body-cell">
              {{ row.current }}
          </div>

          <div class="ui-table__body-cell" :class="getCellColor(row.change)">
              {{ row.change }}
          </div>
        </template>
      </ui-table>
    </section>
  </div>
</template>

<script>
import {payload} from './mocData/index'
import simulateAsyncReq from './plugins/getDataFunc'

export default {
  name: 'App',

  data () {
    return {
      isLoading: false,
      payload: payload,
      table: {
        head: null,
        body: null,
      },
      sort: 1
    }
  },

  methods: {
    async getTableData() {
      this.isLoading = true
      this.table.body = null
      this.table.head = null

      try {
        const data = await simulateAsyncReq(this.payload)
        if (data && Object.keys(data).length) this.prepareTable(data)
        this.isLoading = false
      } catch (error) {
        console.log('getTableData:', error);
        this.isLoading = false
      }
    },
    
    prepareTable (data) {
      console.log(data);

      const body = []
      data.stocks.forEach((el, i) => {
        let changeValue = (data.start[i] - data.current[i]).toFixed(2)
        if (data.start[i] - data.current[i] > 0) changeValue = `+${changeValue}`

        body[i] = {stock: data.stocks[i], current: +data.current[i].toFixed(2), change: changeValue}
      })

      this.table.head = ['stock', 'current', 'change']
      this.table.body = body
    },

    onSort (value) {
      if (value === 'stock') {
        this.table.body = this.table.body.sort((a,b) => {
          if(a.stock < b.stock) { return this.sort === 1 ? -1 : 1; }
          if(a.stock > b.stock) { return this.sort === 1 ? 1 : -1; }
          return 0;
        })
        this.sort === 1 ? this.sort = -1 : this.sort = 1
      }
    },

    getCellColor (cell) {
      if (typeof cell !== 'string') return
      return cell.includes('-') ? 'red' : cell.includes('+') ? 'green' : '' 
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .home {
    &__stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &__table {
      width: 400px;
    }
  }
}
</style>
