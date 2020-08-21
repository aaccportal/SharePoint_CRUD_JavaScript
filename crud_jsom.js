<link href="/_layouts/15/IdeasPortal/css/bootstrap.min.css" rel="stylesheet" />
<script src="/_layouts/15/IdeasPortal/js/jquery.min.js"></script>
<script src="/_layouts/15/IdeasPortal/js/bootstrap.min.js"></script>
<script>
    //http://spp.nvg.ru/test/Lists/TestList2
    var siteUrl = 'http://spp.nvg.ru/test/';
    var listTitle = "TestList2";
    var itemId = 2;
    //создание элемента списка
    function createListItem() {
        var title = $("#Title").val();
        var description = $("#Description").val();
        var selection = $("#Selection").val();

        var clientContext = new SP.ClientContext(siteUrl);
        var listitemCreationInfo = new SP.ListItemCreationInformation();
        var oitem = clientContext.get_web().get_lists().getByTitle(listTitle).addItem(listitemCreationInfo);
        oitem.set_item('Title', title);
        oitem.set_item('Description', description);
        oitem.set_item('Selection', selection);
        oitem.update();
        clientContext.load(oitem);
        clientContext.executeQueryAsync(onQuerySucceeded, onQueryFail);
        //window.location.replace(siteUrl + TestList2);
    }

    //чтение всех элементов списка
    function readListItems() {
        var clientContext = new SP.ClientContext(siteUrl);
        var oList = clientContext.get_web().get_lists().getByTitle(listTitle);
        var caml = new SP.CamlQuery();
        caml.set_viewXml("");
        returnedItems = oList.getItems(caml);
        clientContext.load(returnedItems);
        clientContext.executeQueryAsync(onSucceededCallback, onQueryFail);
    }
    function onSucceededCallback(sender, args) {
        var enumerator = returnedItems.getEnumerator();
        var result = "<table>";
        while (enumerator.moveNext()) {
            var listItem = enumerator.get_current();
            var title = listItem.get_item("Title");
            var description = listItem.get_item("Description");
            var selection = listItem.get_item("Selection");
            result = result + "<tr><td>" + title + "</td><td>" + description + "</td><td>" + selection + "</td></tr>";
            console.log(title + "   " + description + " " + selection);
        }
        result = result + "  </table>";
        document.getElementById("tbl").innerHTML = result;
    }

    //обновление элементов списка
    function updateListItem() {
        var title = $("#Title").val();
        var description = $("#Description").val();
        var selection = $("#Selection").val();

        var clientContext = new SP.ClientContext(siteUrl);
        var listitemCreationInfo = new SP.ListItemCreationInformation();
        var oList = clientContext.get_web().get_lists().getByTitle(listTitle);
        var listItem = oList.getItemById(itemId);
        listItem.set_item('Title', title);
        listItem.set_item('Description', description);
        listItem.set_item('Selection', selection);
        listItem.update();
        clientContext.load(listItem);
        clientContext.executeQueryAsync(onQuerySucceeded, onQueryFail);
        //window.location.replace(siteUrl + TestList2);
    }

    //удаление элемента списка
    function delListItem() {
        console.log('1');
        var clientContext = new SP.ClientContext(siteUrl);
        var listitemCreationInfo = new SP.ListItemCreationInformation();
        var oList = clientContext.get_web().get_lists().getByTitle(listTitle);
        var listItem = oList.getItemById(itemId);
        listItem.deleteObject();
        clientContext.executeQueryAsync(onQuerySucceeded, onQueryFail);
        //window.location.replace(siteUrl + TestList2);
        console.log('end');
    }

    //чтение элемента списк
    function readListItem() {
        var clientContext = new SP.ClientContext(siteUrl);
        var oList = clientContext.get_web().get_lists().getByTitle(listTitle);
        var caml = new SP.CamlQuery();
        caml.set_viewXml("<View><Query><Where><Eq><FieldRef Name=\'ID\'/><Value Type=\'Number\'>" + itemId + "</Value></Eq></Where></Query></View>");
        returnedItems = oList.getItems(caml);
        clientContext.load(returnedItems);
        clientContext.executeQueryAsync(onQueryReadByIDSucceeded, onQueryFail);
    }
    function onQueryReadByIDSucceeded(sender, args) {
        var enumerator = returnedItems.getEnumerator();
        var result = "<table>";
        var title;
        var description;
        var selection;
        while (enumerator.moveNext()) {
            var listItem = enumerator.get_current();
            title = listItem.get_item("Title");
            description = listItem.get_item("Description");
            selection = listItem.get_item("Selection");
            $("#Title").val(title);
            $("#Description").val(description);
            $("#Selection").val(selection);
            result = result + "<tr><td>" + title + "</td><td>" + description + "</td><td>" + selection + "</td></tr>";
            console.log(title + "   " + description + " " + selection);
        }
        result = result + "  </table>";
        document.getElementById("tbl").innerHTML = result;
    }



    function onQueryFail(sender, args) {
        console.log('Error:' + args.get_message());
    }

    function onQuerySucceeded() {
        console.log('onQuerySucceeded');
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

<button type="button" class="btn btn-success" onclick="createListItem()">CreateListItem</button>
<button type="button" class="btn btn-success" onclick="readListItems()">readListItems</button>
<button type="button" class="btn btn-success" onclick="readListItem()">readListItem</button>
<button type="button" class="btn btn-success" onclick="updateListItem()">updateListItem</button>
<button type="button" class="btn btn-success" onclick="delListItem()">delListItem</button>
