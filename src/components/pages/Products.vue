<template>
    <div>
        <div class="text-right">
            <button class="btn btn-primary text-right mt-3" @click="openModal(true)">新增編輯商品</button>
            <!-- Modal -->
            <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        <span>新增產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" v-if="tempProduct">
                        <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                            <label for="image">輸入圖片網址</label>
                            <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結"
                                v-model="tempProduct.imageUrl">
                            </div>
                            <div class="form-group">
                            <label for="customFile">或 上傳圖片
                                <i class="fas fa-spinner fa-spin"></i>
                            </label>
                            <input type="file" id="customFile" class="form-control"
                                ref="files">
                            </div>
                            <img :src="tempProduct.imageUrl" class="img-fluid" alt="">
                        </div>
                        <div class="col-sm-8">
                            <div class="form-group">
                            <label for="title">標題</label>
                            <input type="text" class="form-control" id="title" placeholder="請輸入標題"
                                v-model="tempProduct.title">
                            </div>

                            <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="category">分類</label>
                                <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                                    v-model="tempProduct.category">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">單位</label>
                                <input type="unit" class="form-control" id="unit" placeholder="請輸入單位"
                                    v-model="tempProduct.unit">
                            </div>
                            </div>

                            <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="origin_price">原價</label>
                                <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價"
                                    v-model="tempProduct.origin_price">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">售價</label>
                                <input type="number" class="form-control" id="price" placeholder="請輸入售價"
                                    v-model="tempProduct.price">
                            </div>
                            </div>
                            <hr>

                            <div class="form-group">
                            <label for="description">產品描述</label>
                            <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述"
                                v-model="tempProduct.description"></textarea>
                            </div>
                            <div class="form-group">
                            <label for="content">說明內容</label>
                            <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容"
                                v-model="tempProduct.content"></textarea>
                            </div>
                            <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                v-model="tempProduct.is_enabled"
                                :true-value="1"
                                :false-value="0"
                                id="is_enabled">
                                <label class="form-check-label" for="is_enabled">
                                是否啟用
                                </label>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary"
                            @click="updateProduct">確認</button>
                    </div>
                    </div>
                </div>
                </div>
                <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger"
                        >確認刪除</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <table class="table mt-5">
            <thead>
                <tr>
                    <th width="120">分類</th>
                    <th>產品名稱</th>
                    <th width="100" class="text-right">原價</th>
                    <th width="100" class="text-right">售價</th>
                    <th width="100" class="">啟用</th>
                    <th width="100">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in products" :key="item.id">
                    <td>{{ item.category }}</td>
                    <td>{{ item.title }}</td>
                    <td class="text-right">$ {{ item.origin_price }}</td>
                    <td class="text-right">$ {{ item.price }}</td>
                    <td>
                        <span v-if="item.is_enabled === 1">已啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td width="200">
                        <button class="btn btn-outline-primary" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger" @click="deleteProduct(item)">刪除</button>
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>
</template>
<script>

import swal from 'sweetalert';
export default {
    data(){
        return {
            products:[],
            tempProduct:{
                title: "",
                category: "",
                origin_price: 0,
                price: 0,
                unit: "",
                image: "",
                description: "",
                content: "",
                is_enabled: 1,
                imageUrl: ""
            },
            isNew:false
        }
    },
    created(){
        this.getProducts();
    },
    methods:{
        // 開啟視窗時判斷資料為新(新增 isNew)或舊(編輯 item)
        openModal(isNew, item){
            if(isNew){
                this.isNew = true;
                this.tempProduct = { //新增商品的話清除暫存檔
                    title: "",
                    category: "",
                    origin_price: 0,
                    price: 0,
                    unit: "",
                    image: "",
                    description: "",
                    content: "",
                    is_enabled: 1,
                    imageUrl: ""
                };
            }else{
                this.isNew = false;
                // 避免物件傳參考的特性 使用Object.assign方法複製一個新的Obj!!!!!!!!!!
                this.tempProduct = Object.assign({},item)
            }
            $('#productModal').modal('show');
        },
        getProducts(){
            const api = `${process.env.API_PATH}/api/${process.env.API_ACCOUNT}/admin/products`;
            const vm = this;
            
            //申請的API Path
            this.$http.get(api).then((response) => {
                vm.products = response.data.products;
            })
        },
        //新增與修改商品寫在同一個功能去判斷
        updateProduct(){
            let api = `${process.env.API_PATH}/api/${process.env.API_ACCOUNT}/admin/product`;
            let httpMethods = 'post';
            const vm = this;

            //若是編輯產品
            if(!vm.isNew){
                api = `${process.env.API_PATH}/api/${process.env.API_ACCOUNT}/admin/product/${vm.tempProduct.id}`;
                httpMethods = 'put';
            }
            //申請的API Path
            this.$http[httpMethods](api,{data:vm.tempProduct}).then((response) => {
                if(response.data.success){
                    vm.getProducts();
                    let msg;
                    !vm.isNew ? msg = '產品修改成功!' : msg = '產品新增成功!';

                    swal({
                        title: msg,
                        icon: "success",
                        button: "了解",
                    });
                }else{
                    vm.getProducts();
                    let msg;
                    !vm.isNew ? msg = '產品修改失敗!' : msg = '產品新增失敗!';

                    swal({
                        title: msg,
                        icon: "error",
                        button: "了解",
                    });
                }
                $('#productModal').modal('hide');
            })
        },
        deleteProduct(item){
            let api = `${process.env.API_PATH}/api/${process.env.API_ACCOUNT}/admin/product/${item.id}`;
            const vm = this;
            this.$http.delete(api).then((response) => {
                if(response.data.success){
                    vm.getProducts();
                    swal({
                        title: '產品刪除成功',
                        icon: "success",
                        button: "了解",
                    });
                }else{
                    vm.getProducts();
                    swal({
                        title: '產品刪除失敗',
                        icon: "error",
                        button: "了解",
                    });
                }
                $('#productModal').modal('hide');
            })
        }
    },

}
</script>