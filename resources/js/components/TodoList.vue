<template >
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6 mt-5 mb-5">
                <div class="card">
                    <div class="card-header">
                        <h4>Add Task:</h4>
                    </div>
                    <div class="card-body">
                        <div class="input-group">
                            <input type="text" class="form-control" name="" id="" placeholder="add todo.."
                                aria-describedby="helpId" v-model="todo_input">
                            <div class="input-group-append">
                                <span v-if="edit_id">
                                    <button type="button" class="btn btn-primary ml-2"
                                        @click="updateTodo()">Update</button>

                                </span>
                                <span v-else>
                                    <button type="button" class="btn btn-success ml-2" @click="saveTodo">Add</button>
                                </span>
                            </div>
                        </div>
                        <button v-if="edit_id" type="button" class="btn text-danger btn-sm" style="float:right;"
                            @click="resetTodo">reset</button>
                        <table class="table table-striped table-inverse table-responsive">
                            <thead class="thead-inverse">
                                <tr>
                                    <th>S.no.</th>
                                    <th>Todo Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(todo, index) in todos" :key="index">
                                    <td>{{ ++index }}</td>
                                    <td>{{ todo.name }}</td>
                                    <td><button type="button" class="btn btn-info btn-sm"
                                            @click="editTodo(--index)">edit</button></td>

                                    <td><button type="button" class="btn btn-danger btn-sm"
                                            @click="deleteTodo(--index)">Delete</button></td>

                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todos: [],
            todo_input: '',
            api: 'http://127.0.0.1:8000/api/todos',
            edit_id: '',
            edit_index: ''
        };
    },
    mounted() {
        this.axios.get(this.api).then((response) => {
            this.todos = response.data;
        });
    },
    methods: {
        saveTodo() {

            if (this.todo_input.length > 0) {
                let data = {
                    'name': this.todo_input
                };
                this.axios.post(this.api, data).then((response) => {
                    this.todos.push(response.data);
                    this.todo_input = '';
                });
            }
        },
        deleteTodo(index) {
            if (this.todos[index].id) {
                this.axios.delete(this.api + '/' + this.todos[index].id).then((response) => {
                    // console.log(response.data);
                    this.todos.splice(index, 1);
                });
            }

        },
        editTodo(index) {
            if (this.todos[index].id) {
                this.todo_input = this.todos[index].name;
                this.edit_id = this.todos[index].id;
                this.edit_index = index;

            }
        },
        updateTodo() {
            if (this.todo_input.length > 0) {
                let data = {
                    'name': this.todo_input
                };
                this.axios.patch(this.api + '/' + this.todos[this.edit_index].id, data).then((response) => {
                    //    console.log( response.data.name);
                    this.todos[this.edit_index].name = response.data.name;
                });
            }
        },
        resetTodo() {
            this.todo_input = '';
            this.edit_id = '';
            this.edit_index = '';
        }
    }

}
</script>
