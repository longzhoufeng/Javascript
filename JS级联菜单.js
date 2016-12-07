<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript" src="assets/tree/js/jquery.min.js"></script>
    <style type="text/css">
        body{font-size:13px}
        .clsInit{width:435px;height::35px;line-height:35px;padding-left:10px}
        .clsTip{padding-top:5px;background-color:#eee;display:none}
        .btn{border:solid 1px #666;padding:2px;width:65px;float:right;margin-top:6px;margin-right:6px;filter:progid:DXImageTransform.Mcrosoft.Gradient(GraientType=0,StartColorStr=#FFFFFF,EndColorStr=#ECE9D8);}
    </style>
    <script type="text/javascript">
        $(function(){
            function objInit(obj){
                return $(obj).html('<option>请选择</option>');
            }
            var arrData={
                厂商1:{品牌一:'型号1-1-1,型号1-1-2',品牌二:'型号1-2-1,型号1-2-2'},
                厂商2:{品牌一:'型号2-1-1,型号2-1-2',品牌二:'型号2-2-1,型号2-2-2'},
                厂商3:{品牌一:'型号3-1-1,型号3-1-2',品牌二:'型号3-2-1,型号3-2-2'}
            };
            $.each(arrData,function(pF){
                $('#selF').append('<option>'+pF+'</option>');
            });
            $('#selF').change(function(){
                objInit('#selT');
                objInit('#selC');
                $.each(arrData,function(pF,pS){
                    if($('#selF option:selected').text()==pF){
                        $.each(pS,function(pT,pC){
                            $('#selT').append('<option>'+pT+'</option>');
                        });
                        $('#selT').change(function(){
                            objInit('#selC');
                            $.each(pS,function(pT,pC){
                                if($('#selT option:selected').text()==pT){
                                    $.each(pC.split(","),function(){
                                        $('#selC').append('<option>'+this+'</option>');
                                    })
                                }
                            })

                        });
                    }
                })
            });
        });
    </script>
</head>

<body>

<div class="clsInit">
    厂商：<select id="selF"><option>请选择</option></select>
    品牌：<select id="selT"><option>请选择</option></select>
    型号：<select id="selC"><option>请选择</option></select>
    <input type="button" value="查询" id="Button1" class="btn" />
</div>
<div class="clsInit" id="divTip"></div>

</body>
</html>
