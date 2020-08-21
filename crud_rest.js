<link href="/_layouts/15/IdeasPortal/css/bootstrap.min.css" rel="stylesheet" />
<script src="/_layouts/15/IdeasPortal/js/jquery.min.js"></script>
<script src="/_layouts/15/IdeasPortal/js/bootstrap.min.js"></script>
<script>
    //http://spp.nvg.ru/test/Lists/TestList2
    var siteUrl = 'http://spp.nvg.ru/test/';
    var listTitle = "TestList2";
    var itemId = 8;
    //создание элемента списка

    var listName = "TestList2";
    var itemType = GetItemTypeForListName(listName);
    function CreateListItem() {
        console.log('start');
        var title = $("#Title").val();
        var description = $("#Description").val();
        var selection = $("#Selection").val();;
        var item = {
            "__metadata": { "type": itemType },
            "Title": title,
            "Description": description,
            "Selection": selection,
        };
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                ReadListItems();
                console.log("success" + data);
            },
            error: function (data) {
                console.log("error" + data.responseJSON.error);
            }
        });
        console.log('start');

    }
    function GetItemTypeForListName(name) {
        return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
    }


    //чтение всех элементов списка
    function ReadListItems() {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('" + listName + "')/items",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                console.log(data.d);
                var resulttbl = "<table>";
                for (i = 0; i < data.d.results.length; i++) {
                    var result = data.d.results[i];
                    console.log('---------------------');
                    console.log(result.Title);
                    console.log(result.Description);
                    console.log(result.Selection);
                    resulttbl = resulttbl + "<tr><td>" + result.Title + "</td><td>" + result.Description + "</td><td>" + result.Selection + "</td></tr>";
                }
                resulttbl = resulttbl + "  </table>";
                document.getElementById("tbl").innerHTML = resulttbl;
            },
            error: function (data) {
                console.log("Error: " + data)
            }
        });
    }

    //чтение элемента списк
    function ReadListItem() {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + itemId + ")",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                console.log("success");
                $("#Title").val(data.d.Title);
                $("#Description").val(data.d.Description);
                $("#Selection").val(data.d.Selection);

            },
            error: function (data) {
                console.log("failed");
                $("#Title").val("");
                $("#Description").val("");
                $("#Selection").val("");
            }
        });
    }

    //обновление элементов списка
    function UpdateListItem() {
        var title = $("#Title").val();
        var description = $("#Description").val();
        var selection = $("#Selection").val();;
        var item = {
            "__metadata": { "type": itemType },
            "Title": title,
            "Description": description,
            "Selection": selection,
        };

        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items(" + itemId + ")",
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE",
            },
            success: function (data) {
                ReadListItems();
                console.log("success" + data);
            },
            error: function (data) {
                console.log("error" + data.responseJSON.error);
            }
        });
    }

    //удаление элемента списка
    function DelListItem() {
        var itemId = "5"
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('TestList2')/items(" + itemId + ")",
            type: "POST",
            contentType: "application/json;odata=verbose",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE",
            },
            success: function (data) {
                console.log("success");
                ReadListItems();
            },
            error: function (data) {
                console.log("failed");
            }
        });
    }



</script>

<fieldset>
    <legend>Тестовая форма</legend>
    <label style="padding-right: 50px">Title:
        <input type="text" class="form-control" id="Title">
    </label>
    <br>
    <label style="padding-right: 50px">Description:
        <input type="text" class="form-control" id="Description">
    </label>
    <br>
    <label style="padding-right: 50px">Selection:
        <select class="form-control" id="Selection">
            <option>Пункт 1</option>
            <option>Пункт 2</option>
        </select>
    </label>
</fieldset>
<div id="tbl">

</div>
<div style='display:none; font-weight:bold;color:red;text-align: center; padding:10px; border: 2px solid red;'
    id='CourseCheck'></div>

<button type="button" class="btn btn-success" onclick="CreateListItem()">CreateListItem</button>
<button type="button" class="btn btn-success" onclick="ReadListItems()">ReadListItems</button>
<button type="button" class="btn btn-success" onclick="ReadListItem()">ReadListItem</button>
<button type="button" class="btn btn-success" onclick="UpdateListItem()">UpdateListItem</button>
<button type="button" class="btn btn-success" onclick="DelListItem()">DelListItem</button>
