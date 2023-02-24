import Vue from 'vue';

// 按需加载
// import Message from 'element-ui/lib/message'
// import Loading from 'element-ui/lib/loading'
// import Notification from 'element-ui/lib/notification'
// import MessageBox from 'element-ui/lib/message-box'

// import 'element-ui/lib/theme-chalk/message.css'
// import 'element-ui/lib/theme-chalk/message-box.css'
// import 'element-ui/lib/theme-chalk/loading.css'
// import 'element-ui/lib/theme-chalk/notification.css'

// Vue.use(Loading.directive);

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
// Vue.prototype.$message = Message;

// 全局引入
import Element from 'element-ui';
import './element-variables.scss';
// import 'element-ui/lib/theme-chalk/index.css';

// 全局修改默认配置，点击空白处不能关闭弹窗
Element.Dialog.props.closeOnClickModal.default = false;
// 全局修改默认配置，按下ESC不能关闭弹窗
Element.Dialog.props.closeOnPressEscape.default = false;

Vue.use(Element);
