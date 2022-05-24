<template>
  <header>
    <div class="container">
      <h2 class="app-title">{{ title }}</h2>
      <p>Использованы технологии: node, express, mongodb, vue</p>
    </div>
  </header>
  <main>
    <div class="container">
      <section>
        <article>
          <h4 class="section-heading">Поиск документа</h4>
          <label for="search" class="form-label">Поиск пользователя</label>
          <div class="mb-2">
            <div class="d-flex mb-2">
              <input
                class="form-control"
                type="text"
                id="search"
                v-model="search"
              />
              <button @click="searchOne" class="btn btn-primary">Найти</button>
            </div>
            <p class="text-success" v-if="searchDoc">
              <span><b>element id:</b>{{ this.searchDoc._id }}</span
              ><a href="javascript:void(0)" @click="edit">Редактировать</a>
            </p>
            <p class="text-muted" v-if="searchDoc == null && search">
              <span class="text-danger">Не найдено!</span>
            </p>
          </div>

          <div class="new_username" v-if="show_editer && searchDoc">
            <label for="new_username" class="form-label"
              >Введите новое значение</label
            >
            <div class="mb-2">
              <div class="d-flex mb-2">
                <input
                  class="form-control"
                  type="text"
                  id="new_username"
                  v-model="new_username"
                />
                <button @click="edit_username" class="btn btn-primary">
                  Сохранить
                </button>
              </div>
            </div>
            <p v-if="err_new_username" class="text-danger">{{ err_new_username }}</p>
          </div>
        </article>

        <article>
          <h4>Добавление пользователя</h4>
          <label for="search" class="form-label">Добавить пользователя</label>
          <div class="mb-2">
            <div class="d-flex mb-2">
              <input
                class="form-control"
                type="text"
                id="search"
                v-model="username"
              />
              <button @click="add" class="btn btn-primary">Добавить</button>
            </div>
            <p class="text-muted" v-if="added">{{ this.added }}</p>
          </div>
        </article>
      </section>
      <section>
        <h4 class="section-heading">База данных</h4>
        <div v-if="userlist">
          <table class="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">_id</th>
                <th scope="col">username</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in userlist" :key="user">
                <td scope="row">{{ index }}</td>
                <td >{{ user._id }}</td>
                <td >{{ user.username }} <button @click="remove(user.username)">Удалить</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      title: "Приложение для работы с БД",
      search: "",
      searchDoc: "",
      username: "",
      err_new_username: "",
      added: "",
      new_username: "",
      show_editer: false,
      userlist: "",
    };
  },
 created () {
   this.list()
 },
  methods: {
    list: function () {
      this.$axios({
        method: "get",
        url: "//localhost:3000/user/getuserlist",
      })
        .then((response) => {
          this.userlist = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchOne: function () {
      this.$axios({
        method: "post",
        url: "//localhost:3000/user/search",
        data: {
          username: this.search,
        },
      })
        .then((response) => {
          if (response.data) {
            this.searchDoc = response.data;
          } else {
            this.searchDoc = null;
          }
        })
        .catch((err) => {
          this.searchDoc = err;
        });
    },
    add: function () {
      this.$axios({
        method: "post",
        url: "//localhost:3000/user/add",
        data: {
          username: this.username,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.code == 11000) {
            this.added = "Duplicate key error!";
          } else {
            this.added = this.username + " inserted";
          }
          this.list()
        })
        .catch((err) => {
          this.added = err;
        });
    },
    edit: function () {
      this.show_editer = true;
    },
    edit_username: function () {
      console.log(this.searchDoc);
      this.$axios({
        method: "post",
        url: "//localhost:3000/user/edit_username",
        data: {
          username: this.searchDoc.username,
          new_username: this.new_username,
        },
      }).then((response) => {
        if (response.data.code == 11000) {
          return this.err_new_username = response.data.codeName
        }

        this.new_username = null;
        this.search = null;
        this.show_editer = false
        this.searchDoc = false
        this.list()
      });
    },
    remove: function (id) {
      this.$axios({
        method: "post",
        url: "//localhost:3000/user/remove",
        data: {
          id: id,
        },
      })
        .then(() => {
          this.list()
        })
        .catch((err) => {
          console.log(err)
        });
    }
  },
};
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.min.css";
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap");
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
header {
  // border-bottom: 1px solid #f4f4f4;
  margin-bottom: 30px;
  padding-bottom: 30px;
}
.section-heading {
  font-weight: 600;
}
input {
  margin-right: 2px;
}
input,
button {
  border: 0;
  border: 1px solid #000;
  background: transparent;
  outline: none;
}
.form-control {
  margin-right: 5px;
}
button {
  cursor: pointer;
}

article {
  text-align: left;
  margin-bottom: 15px;
  p {
    display: flex;
    span {
      margin: auto 0;
    }
    a {
      display: inline-block;
      text-decoration: none;
      margin: auto 0 auto 15px;
      background: #d79563;
      color: #fff;
      border-radius: 32px;
      font-size: 12px;
      padding: 6px 16px;
      &:hover {
        background: #f3af7c;
        color: #fff;
      }
    }
  }
}

section {
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0;
  }
}

.newuser {
  padding: 0.9rem;
  background: #eee;
  border-radius: 0.9rem;
}

td {
  button {
    background: #000;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
  }
}
</style>
