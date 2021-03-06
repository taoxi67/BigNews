$(function () {
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        zIndex: 20999,  //修改日期插件的弹出层级
        minDate: "2014-09-19 00:00:00"
    })

    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()

    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                var htmlStr = template('categoryList', res);
                $('.category').html(htmlStr)
            }
        }
    })

    $('#inputCover').on('change', function () {
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        $('.article_cover').attr('src', url)
    })

    $('#form').on('click', '.btn', function (e) {
        e.preventDefault();
        var form = $('#form')[0];
        var data = new FormData(form);
        data.append('content', editor.txt.html());
        if ($(e.target).hasClass('btn-release')) {
            data.append('state', '已发布');
        } else {
            data.append('state', '草稿')
        };
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                window.location.href = './article_list.html'
            }
        })
    })

})