// modules/file.js
const exportFile = {
    url: "/export_file",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:''
        }
    }
}

module.exports = [
    exportFile

]