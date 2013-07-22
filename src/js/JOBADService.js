;(function($){
    JOBAD.modules.register({
        info:{
            'identifier':   'kat',
            'title':    'KAT',
            'author':   'Tom Wiesing',
            'description':  'Enables KAT on the current page. '
        },
        init: function(JI){
            var myKAT = new kat.main.KATService(JI.element); 
            this.localStore.set("katInstance", myKAT);
            JI.Setup.deferUntilEnabled(function(){
                myKAT.run(); 
            });
        },
        contextMenuEntries: function(target){  
            var self = this.localStore.get("katInstance")._preProcessor;
            console.log(self); 
            var selectedIds = self.getSelectedIds(); 
            if(selectedIds === null){
                return; 
            }
            return {"Add Annotation": function(){
                var typeForm = new kat.display.AnnotationTypeForm(selectedIds["baseNodeId"], selectedIds["extentNodeId"], self._ontologyRegistry, self._conceptRegistry, self._anotationRegistry);
                typeForm.run();
            }}
        }
    });
})(JOBAD.refs.$);