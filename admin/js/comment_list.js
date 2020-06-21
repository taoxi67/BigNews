$(function () {
    function aaa(maPage, bbb) {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                page: maPage,
                perpage: 10,
            },
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('tbodyList', res.data);
                    $('tbody').html(htmlStr);
                    if (res.data.totalCount != 0 && bbb != null) {
                        $('#pagination-demo').show().next().hide();
                        bbb(res);
                    } else if (res.data.totalCount == 0 && maPage == 1) {
                        $('#pagination-demo').hide().next().show();
                    } else if (res.data.totalCount != 0 && res.data.data.length == 0) {
                        pageNum -= 1;
                        $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, pageNum)
                    }
                }
            }
        })
    }
    aaa(1, function (res) {
        pagination(res);
    })

    var pageNum = 1
    function pagination(res) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage,
            visiblePages: 7,
            first: '首页',
            last: '尾页',
            next: '下一页',
            prev: '上一页',
            onPageClick: function (event, page) {
                pageNum = page

                // 根据当前页码获取对应的数据渲染到页面当中
                aaa(page, null)
            }
        })
    };

    $('tbody').on('click', '.btn-pass', function () {
        var _this = $(this);
        $.ajax({
            type: 'post',
            url: BigNew.comment_pass,
            data: {
                id: $(this).data('id'),
            },
            success: function (res) {
                // console.log(res);
                _this.parent().prev().html(res.msg)
            }
        })
    });


    $('tbody').on('click', '.btn-reject', function () {
        var _this = $(this);
        $.ajax({
            type: 'post',
            url: BigNew.comment_reject,
            data: {
                id: $(this).data('id'),
            },
            success: function (res) {
                // console.log(res);
                _this.parent().prev().html(res.msg)
            }
        })
    });

    $('tbody').on('click', '.btn-del', function () {
        $.ajax({
            type: 'post',
            url: BigNew.comment_delete,
            data: {
                id: $(this).data('id'),
            },
            success: function (res) {
                // console.log(res);
                aaa(pageNum, null)
            }
        })
    });

})