$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                for (var key in res.data) {
                    $('#form .' + key).val(res.data[key])
                }
                $('#form .user_pic').attr('src', res.data.userPic)
            }
        }
    })

    $('#exampleInputFile').on('change', function () {
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        $('#form .user_pic').attr('src', url);
    })

    $('#form').on('submit', function (e) {
        e.preventDefault();
        var data = new FormData(this);
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.code == 200) {
                    console.log(res)
                    $.ajax({
                        type: 'get',
                        url: BigNew.user_info,
                        success: function (res) {
                            console.log(res)
                            if (res.code == 200) {
                                console.log(res)
                                parent.$('.user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`);
                                parent.$('.user_info img').attr('src', res.data.userPic);
                                parent.$('.user_center_link img').attr('src', res.data.userPic);
                                $('.modal').modal('show');
                                $('modal-title').text('更新成功!');
                            }
                        }
                    });
                }
            }
        })
    })
})

