'use strict';
/**
 * error controller
 */
export default class extends think.controller.base {
    /**
     * 
     */
    async uploadfileAction() {
            let file = think.extend({}, this.file('file'));
            console.log(file);
            let filepath = file.path;
            let basename = path.basename(filepath);
            let data;
            let uploadPath = think.RESOURCE_PATH + '/upload/file/' + dateformat("Y-m-d", new Date().getTime());
            think.mkdir(uploadPath);
            fs.renameSync(filepath, uploadPath + '/' + basename);
            file.path = uploadPath + '/' + basename;
            if (think.isFile(file.path)) {
                data = {
                    savepath: '/upload/file/' + dateformat("Y-m-d", new Date().getTime()) + '/',
                    create_time: new Date().getTime(),
                    name: file.originalFilename,
                    savename: basename,
                    mime: file.headers["content-type"],
                    size: file.size,
                    md5: think.md5(basename)
                }
            }
            console.log(data);
            var res = await this.model("file").data(data).add();
            this.json({ id: res, size: file.size });
        }
        /**
         * 上传图片
         */
    async uploadpicAction() {
        let file = think.extend({}, this.file('file'));
        let filepath = file.path;
        let basename = path.basename(filepath);
        let ret = { 'status': 1, 'info': '上传成功', 'data': "" }
        let res;
        let uploadPath = think.RESOURCE_PATH + '/upload/picture/' + dateformat("Y-m-d", new Date().getTime());
        think.mkdir(uploadPath);
        if (think.isFile(filepath)) {
            fs.renameSync(filepath, uploadPath + '/' + basename);
        } else {
            console.log("文件不存在！")
        }
        file.path = uploadPath + '/' + basename;
        if (think.isFile(file.path)) {
            let data = {
                path: '/upload/picture/' + dateformat("Y-m-d", new Date().getTime()) + '/' + basename,
                create_time: new Date().getTime(),
                status: 1,

            }
            res = await this.model("picture").data(data).add();
        } else {
            console.log('not exist')
        }

        this.json(res);
    }
}