<template>
    <div id="login">
        <!-- 这里是登录页
        <br>
        {{ msg }}
        <el-button>默认按钮</el-button>
        <el-button type="primary" id="a">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
        <br>
        <a-button type="primary">Primary</a-button>
        <a-button>Default</a-button>
        <a-button type="dashed">Dashed</a-button>
        <a-button type="danger">Danger</a-button>
        <a-config-provider :autoInsertSpaceInButton="false">
            <a-button type="primary">按钮</a-button>
        </a-config-provider>
        <a-button type="primary">按钮</a-button>
        <a-button type="link">Link</a-button> -->
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menutab" :key="item.id" :class="{'current' : item.current}"
                    @click="toggleMenu(item)">{{ item.txt }}</li>
                <!-- <li>注册</li> -->
            </ul>
            <!-- 表单开始 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">

                <el-form-item prop="username" class="item-from">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-from">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6"
                        maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" class="item-from" v-show="model === 'register'">
                    <label>重复密码</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6"
                        maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="code" class="item-from">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block">获取验证码</el-button>
                        </el-col>
                    </el-row>

                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api'
    import { stripscript, validateEmail, validatePass, validateVCode } from '@/utils/validate';
    export default {
        name: 'login',
        setup(props, context) {
            //这里放置data数据、生命周期、自定义的函数

            // context.attrs      等效于 this.$attrs
            // context.slots
            // context.parent
            // context.root
            // context.emit

            //声明对象类型的东西使用reactive
            const menuTab = reactive([
                { txt: '登录', current: true, type: 'login' },
                { txt: '注册', current: false, type: 'register' }
            ])
            // console.log(menuTab)
            //声明模块值
            const model = ref('login')
            // console.log(model.value)
            // isRef 用于判断是否是ref类型
            // console.log(isRef(menuTab) ? '是基础数据类型' : '是对象类型')
            // console.log(isRef(model) ? '是基础数据类型' : '是对象类型')
            // toRefs 用于将 reactive 类型转换为 ref 类型 保证对象解构不会丢失响应
            // const obj = reactive({
            //     x: 0,
            //     y: 1
            // })
            // const aa = toRefs(obj)
            // console.log(obj.x);
            // console.log(aa.x.value);
            /**
            * 声明函数
            */
            const toggleMenu = (data => {
                // console.log(data);
                this.menutab.forEach(elem => {
                    elem.current = false
                });
                data.current = true
                //修改模块值
                this.model = data.type
            })
            const submitForm = (formName => {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            })
            /**
             * 生命周期
             */
            //挂载完成后
            onMounted(() => {

            })


        },
        data() {
            //验证用户名
            var validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (validateEmail(value)) {
                    callback(new Error('用户名格式有误'));
                } else {
                    callback();  // true
                }
            };
            //验证密码
            var validatePassword = (rule, value, callback) => {
                // console.log(stripscript(value))
                this.ruleForm.password = stripscript(value)
                value = this.ruleForm.password
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (validatePass(value)) {
                    callback(new Error('密码为6-20位数字+字母'));
                } else {
                    callback();
                }
            };
            //验证重复密码
            var validatePasswords = (rule, value, callback) => {
                if (this.model === 'login') { callback(); }
                // console.log(stripscript(value))
                this.ruleForm.passwords = stripscript(value)
                value = this.ruleForm.passwords
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value != this.ruleForm.password) {
                    callback(new Error('重复密码不正确'));
                } else {
                    callback();
                }
            };
            //验证验证码
            var checkCode = (rule, value, callback) => {
                this.ruleForm.code = stripscript(value)
                value = this.ruleForm.code
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else if (validateVCode(value)) {
                    callback(new Error('验证码格式有误'));
                } else {
                    callback();
                }
            };
            return {
                // msg: '11111'
                menutab: [
                    { txt: '登录', current: true, type: 'login' },
                    { txt: '注册', current: false, type: 'register' }
                ],
                // isActive: true,
                //模块值
                model: 'login',
                // 表单的数据
                ruleForm: {
                    username: '',
                    password: '',
                    passwords: '',
                    code: ''
                },
                rules: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    passwords: [
                        { validator: validatePasswords, trigger: 'blur' }
                    ],
                    code: [
                        { validator: checkCode, trigger: 'blur' }
                    ]
                }
            }
        },
        // methods: {
        //     toggleMenu(data) {
        //         // console.log(data);
        //         this.menutab.forEach(elem => {
        //             elem.current = false
        //         });
        //         data.current = true
        //         //修改模块值
        //         this.model = data.type
        //     },
        //     submitForm(formName) {
        //         this.$refs[formName].validate((valid) => {
        //             if (valid) {
        //                 alert('submit!');
        //             } else {
        //                 console.log('error submit!!');
        //                 return false;
        //             }
        //         });
        //     }
        // },
        //在setup里使用
        // created() {},
        //在setup里使用 onMounted 代替 mounted
        // mounted() {},
        // 子组件接受父组件参数
        props: {},
        watch: {},


    }
</script>
<!-- scoped表示样式对该文件有效，如果不写表示对全局有效 -->
<style lang="scss" scoped>
    #login {
        /* height: 50vh; */
        height: 100vh;
        /*vh表示占可视区的百分比*/
        background-color: #344a5f;
    }

    .login-wrap {
        width: 330px;
        margin: auto;
    }

    .menu-tab {
        text-align: center;

        li {
            display: inline-block;
            width: 80px;
            line-height: 36px;
            font-size: 14px;
            color: #fff;
            border-radius: 2px;
            cursor: pointer;
        }

        .current {
            background-color: rgba(0, 0, 0, .1);
        }
    }

    /*.menu-tab li {
        display: inline-block;
        width: 80px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }

    .menu-tab .current {
        background-color: rgba(0, 0, 0, .1);
    }*/

    .login-form {
        margin-top: 29px;

        label {
            display: block;
            margin-bottom: 3px;
            font-size: 14px;
            color: #fff;
        }

        .item-from {
            margin-bottom: 13px;
        }

        .block {
            display: block;
            width: 100%;
        }

        .login-btn {
            margin-top: 19px;
        }
    }
</style>