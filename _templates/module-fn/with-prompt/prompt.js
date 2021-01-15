// https://github.com/enquirer/enquirer

module.exports = [
    {
        type: 'input',
        name: 'name',
        message: '请输入模块名称，请使用大驼峰式命名法（CamelCase）',
        validate(val) {
            if (/^[A-Z][0-9a-zA-Z_]*$/.test(val)) {
                return true
            }
            return '大驼峰命名，只允许输入字母、数字、下划线，例如HelloWont'
        },
    },
]
