$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            var htmlStr = template('aaa', res)
            $('#selCategory').html(htmlStr)
        }
    })


    getDataByParams(1, pagination);
    function getDataByParams(myPage, callback) {
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                key: $('#key').val(),
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: myPage,
                perpage: 7
            },
            success: function (res) {
                if (res.code == 200) {
                    var htmlStr = template('ccc', res.data)
                    $('tbody').html(htmlStr)
                    if (res.data.totalPage == 0 && myPage == 1) {
                        $('#pagination-demo').hide().next().show()
                    } else if (res.data.totalPage != 0 && callback != null) {
                        $('#pagination-demo').show().next().hide();
                        callback(res);
                    } else if (res.data.totalPage != 0 && res.data.data.length == 0) {
                        currentPage -= 1;
                        $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPage)

                    }
                }
            }
        })
    }

    $('.btn-sm').on('click', function (e) {
        e.preventDefault();
        getDataByParams(1, function (res) {
            $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
        })

    })
    var currentPage;
    function pagination(res, visiblePages) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage, // 总页数
            visiblePages: visiblePages || 7, // 可见最大上限页码值
            first: '首页',
            last: '最后一页',
            next: '下一页',
            prev: '上一页',
            initiateStartPageClick: false, // 不要默认点击 
            onPageClick: function (event, page) {
                // page是当前页码
                currentPage = page;
                getDataByParams(page, null)
            }
        })
    }

    var deleteId;
    $('#delModal').on('show.bs.modal', function (e) {
        console.log(e.relatedTarget);
        deleteId = $(e.relatedTarget).data('id');
        console.log(deleteId);
    })

    $('#delModal .btn-sure').on('click', function () {
        $.ajax({
            type: 'post',
            url: BigNew.article_delete,
            data: {
                id: deleteId,
            },
            success: function (res) {
                $('#delModal').modal('hide');
                getDataByParams(currentPage, null)
            }
        })
    })

})