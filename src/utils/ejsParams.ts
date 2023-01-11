import moment from 'moment'

// ejs 的内置参数对象
export default {
    get date() {
        return moment().format('YYYY-MM-DD')
    }
}
