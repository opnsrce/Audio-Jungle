<?php
require_once dirname(__FILE__) . '/../helpers/EnvatoAPI.php';
class EnvatoAPITest extends PHPUnit_Framework_TestCase {
    protected $envatoAPI;
    protected function setUp() {
        $this->envatoAPI = new EnvatoAPI('edge', 'xml');
    }
    private function compileGetSetParams($set, $params) {
        $dataArray = array();
        if($params) {
            foreach($params as $param) {
                if(is_array($param)) {
                    $dataArray[] = $this->compileGetSetParams($set, $param);
                } else {
                    $dataArray[] = array($set, $param);
                }
            }
        } else {
            $dataArray[] = array($set, '');
        }
        return $dataArray;
    }
    public function setProvider() {
        $marketplaces = array('3docean', 'audiojungle', 'activeden', 'codecanyon', 'graphicriver', 'themeforest', 'videohive');
        $users = array('collis', 'opnsrce');
        $itemIds = array(153288, 153285);
        $threadIds = array(37129, 32829, 37375);
        $collectionIds = array(74175, 266348, 329247);
        $searchExpressions = array('red', 'green', 'blue');
        $marketplaceCategories = array(
            'audiojungle' => array('music', 'music-packs', 'sound'),
            'themeforest' => array('site-templates', 'wordpress', 'cms-themes')
        );
        $sets = array(
            array('name' => 'blog-post', 'params' => $marketplaces),
            array('name' => 'active-threads', 'params' => $marketplaces),
            array('name' => 'number-of-files', 'params' => $marketplaces),
            array('name' => 'popular', 'params' => $marketplaces),
            array('name' => 'releases', 'params' => ''),
            array('name' => 'thread-status', 'params' => $threadIds),
            array('name' => 'collection', 'params' => $collectionIds),
            array('name' => 'features', 'params' => ''),
            array('name' => 'new-files', 'params' => $marketplaceCategories),
            array('name' => 'new-files-from-user', 'params' => array($marketplaces, $users)),
            array('name' => 'random-new-files', 'params' => $marketplaces),
            array('name' => 'total-users', 'params' => ''),
            array('name' => 'item', 'params' => $itemIds),
            array('name' => 'item-prices', 'params' => $itemIds),
            array('name' => 'search', 'params' => array($marketplaceCategories, $searchExpressions)),
            array('name' => 'user', 'params' => $users),
            array('name' => 'user-items-by-site', 'params' => $users),
        );
        $dataArray = array();
        foreach($sets as $set) {
            $dataArray[] = $this->compileGetSetParams($set['name'], $set['params']);
        }
        print_r($dataArray);
        return $dataArray;
    }
    /**
     * @expectedException UnexpectedValueException
     */
    public function test__constructException() {
        try {
            $envatoAPI = new EnvatoAPI('v2', 'badFormat');
        } catch(UnexpectedValueException $e) {
            throw $e;
        }
    }
    /**
     * @expectedException InvalidArgumentException
     */
    public function test__get() {
        $this->assertTrue($this->envatoAPI->format == 'xml');
        try {
            $this->envatoAPI->undefinedProperty;
        } catch(InvalidArgumentException $e) {
            throw $e;
        }
    }
    public function test__set() {
        $this->assertTrue($this->envatoAPI->testValue1 = TRUE);
        $this->assertTrue($this->envatoAPI->testValue2 = TRUE);
        $this->assertFalse($this->envatoAPI->testValue3 = FALSE);
    }
    /**
     * @dataProvider setProvider
     */
    public function testGetSet($set, $additionalParams = NULL) {
        echo "$set || $additionalParams \r\n";
        $this->envatoAPI->getSet($set, $additionalParams);
    }
    /**
     * @expectedException DomainException
     */
    public function testGetBadSet() {
        try {
            $this->envatoAPI->getSet('badSet', 'badParams');
        } catch(DomainException $e) {
            throw $e;
        }
    }
}
?>
