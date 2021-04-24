import Vue from 'vue'
import { Button ,
        Form,
        FormItem,
        Input ,
        Container,
        icon,    
        Message,
        container,
        aside,
        header,
        main ,
        Menu,
        menuItem,
        Submenu,
        menuItemGroup,
        breadcrumb,
        breadcrumbItem,
        card,
        Row,
        col,
        Table,
        TableColumn,
        pagination,
        Switch,
        dialog,
        MessageBox,
        tag,
        tree,
        Select,
        option,
        Cascader,
        Tabs,
        TabPane,  
        steps,
        step,
        checkboxGroup,
        checkbox,
        Upload} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(icon)
Vue.use(container)
Vue.use(aside)
Vue.use(main)
Vue.use(header)
Vue.use(Menu)
Vue.use(menuItem)
Vue.use(Submenu)
Vue.use(menuItemGroup)
Vue.use(breadcrumb)
Vue.use(breadcrumbItem)
Vue.use(card)
Vue.use(Row)
Vue.use(col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(pagination)
Vue.use(Switch)
Vue.use(dialog)
Vue.use(tag)
Vue.use(tree)
Vue.use(Select)
Vue.use(option)
Vue.use(Cascader)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(steps)
Vue.use(step)
Vue.use(checkbox)
Vue.use(checkboxGroup)
Vue.use(Upload)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm