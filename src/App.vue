<template>
  <div id="app">
    <h1>1. Project Create</h1>
    <img alt="Vue logo" src="https://vuejs.org/images/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <h1>2. 宣言的レンダリング</h1>
    <p>{{ hello }}<br>{{ hello2 }}</p>

    <h1>3. 属性バインディング</h1>
    <p v-bind:class="pClass">v-bindディレクティブで<br>動的な属性バインドができる</p>

    <h1>4.イベントリスナー</h1>
    <p>v-on:ディレクティブでDOMイベントをlistenできる</p>
    <button v-on:click="increment">increment when press :{{ count }}</button>

    <h1>5.フォームバインディング</h1>
    <p>v-bindとv-onで双方向にバインドできる</p>
    <input v-bind:value="text" v-on:input="onInput" placeholder="Type here">
    <p>{{ text }}</p>
    <p>v-modelで代替も可。かつイベントハンドラーも不要</p>
    <input v-model="text2" placeholder="v-model">
    <p>{{ text2 }}</p>

    <h1>6.条件付きレンダリング</h1>
    <p>v-ifディレクティブで条件付きのレンダリングができる</p>
    <button v-on:click="toggle">toggle: {{ awesome }}</button>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no</h1>

    <h1>7.リストレンダリング</h1>
    <p>v-forディレクティブで配列をもとにした要素のリストをレンダリングできる</p>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo">
      <button>Add Todo</button>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>

    <h1>8.算出プロパティ</h1>
    <p>リアクティブな依存関係に基づきキャッシュされる</p>
    <form @submit.prevent="addTodo2">
      <input v-model="newTodo2">
      <button>Add Todo</button>
    </form>
    <ul>
      <li v-for="todo2 in filteredTodos" :key="todo2.id">
        <input type="checkbox" v-model="todo2.done">
        <span :class="{ done: todo2.done }">{{ todo2.text }}</span>
        <button @click="removeTodo2(todo2)">X</button>
      </li>
    </ul>
    <button @click="hideCompleted = !hideCompleted">
      {{ hideCompleted ? 'Show all' : 'Hide completed' }}
    </button>

    <h1>9.ライフサイクルとテンプレート参照</h1>
    <p>ref属性でテンプレート参照が要求できる</p>
    <p>コンポーネントがマウントされた後にthis.$refs.pでアクセスできる</p>
    <p ref="p">ref</p>

    <h1>10.ウォッチャー</h1>
    <p>side effects(副作用)をリアクティブに実行</p>
    <p>数値が変化したときにコンソールログを出力するなど</p>
    <p>Todo id: {{ todoId }}</p>
    <button @click="todoId++">Fetch next todo</button>
    <p v-if="!todoData">Loading...</p>
    <pre v-else>{{ todoData }}</pre>

    <h1>11.コンポーネント</h1>
    <child-comp></child-comp>

    <h1>12.プロパティ</h1>
    <child-comp2 :msg="greeting"></child-comp2>

    <h1>13.イベントの発行</h1>
    <child-comp3 @response="(msg) => childMsg = msg"></child-comp3>
    <p>{{ childMsg }}</p>
    <h1>14.スロット</h1>
    <child-comp4>Message: {{ parentMsg }}</child-comp4>
    <h1>15.やったね！</h1>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ChildComp from './components/ChildComp.js'
import ChildComp2 from './components/ChildComp2.js'
import ChildComp3 from './components/ChildComp3.js'
import ChildComp4 from './components/ChildComp4.js'

let id = 0

export default {
  name: 'App',
  components: {
    HelloWorld,
    ChildComp,
    ChildComp2,
    ChildComp3,
    ChildComp4
  },
  data() {
    return {
      hello: 'mustaches構文{{ hoge }}で',
      hello2: 'パラメータの値に基づいた動的なテキストレンダリングができる',
      pClass: 'p',
      count: 0,
      text: '',
      text2: '',
      awesome: true,
      newTodo: '',
      todos: [
        { id: id++, text: 'Learn HTML' },
        { id: id++, text: 'Learn JavaScript' },
        { id: id++, text: 'Learn Vue' }
      ],
      hideCompleted: false,
      newTodo2: '',
      todo2s: [
        { id: id++, text: 'Learn a', done: true },
        { id: id++, text: 'Learn b', done: true },
        { id: id++, text: 'Learn c', done: false }
      ],
      todoId: 1,
      todoData: null,
      greeting: '親コンポーネントから値渡し',
      childMsg: 'No child msg yet',
      parentMsg: 'from parent'
    }
  },
  mounted() {
    this.$refs.p.textContent = "mounted!"
    this.fetchData()
  },
  watch: {
    todoId() {
      this.fetchData()
    }
  },
  methods: {
    increment() {
      this.count++
    },
    onInput(e) {
      this.text = e.target.value
    },
    toggle() {
      this.awesome = !this.awesome
    },
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    },
    addTodo2() {
      this.todo2s.push({ id: id++, text: this.newTodo2, done: false })
      this.newTodo2 = ''
    },
    removeTodo2(todo) {
      this.todo2s = this.todo2s.filter((t) => t !== todo)
    },
    async fetchData() {
      this.todoData = null
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${this.todoId}`
      )
      this.todoData = await res.json()
    }
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todo2s.filter((t) => !t.done)
        : this.todo2s
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.p{
  color: red;
}
.done {
  text-decoration: line-through;
}
</style>
