<?php
class EnvatoController {
    private $cn;
    private $envatoAPI;
    public function __construct($cn, EnvatoAPI $envatoApi) {
        $this->cn = $cn;
        $this->envatoAPI = $envatoApi;
    }
    public function index() {
        
    }
    public function search() {

    }
    public function getSet() {
        $site = $_GET['site'];
        $set = $_GET['set'];
        $params = $_GET['params'];
        return json_encode(array('root' => $this->envatoAPI->getSet($set, $params)));
    }
}
?>