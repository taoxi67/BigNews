$(function () {
    $('.login_form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: BigNew.user_login,
            data: $(this).serialize(),
            beforeSend: function () {
                var flag = false;
                $('.login_form input[name]').each(function (index, ele) {
                    if ($.trim($(ele).val()) == '') {
                        var flag = true;
                    }
                });
                if (flag) {
                    $('.modal').modal('show');
                    $('.modal-body p').text(输入的用户名或者密码不可以为空);
                    return false;
                }
            },
            success: function (res) {
                $('.modal').modal('show');
                $('.modal-body p').text(res.msg);
                if (res.code == 200) {
                    $('.modal').on('hide.bs.modal', function () {
                        localStorage.setItem('token', res.token);
                        window.location.href = './index.html';
                    })
                }
                console.log(res)
            }
        })
    })
})