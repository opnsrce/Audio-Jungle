<?php
/**
 * Utility class designed to interact with the {@link http://marketplace.envato.com/api/documentation Envato API}
 * @author Levi Hackwith <levi.hackwith@gmail.com>
 * @version 1.0
 * @copyright 2010 Levi Hackwith
 * @package Envato
 * @subpackage API
 */
class EnvatoAPI {
    /**
     * The main url that used to create all the commands sent to the API
     * @access private
     * @var string
     */
    private $baseURL = 'http://marketplace.envato.com/api';
    /**
     * Specifies what version of the API to use
     * @access private
     * @var string
     */
    private $version = '';
    /**
     * The format to return all requests in. Valid values are 'json' and 'xml'
     * @access private
     * @var string
     */
    private $format = '';
    /**
     * Exception code used when an invalid set is requested from the API
     * @access private
     * @var constant
     */
    const ENVATO_INVALID_SET = 1;
    const ENVATO_INVALID_DATA_FORMAT = 2;
    const ENVATO_INVALID_API_CALL = 3;
    const ENVATO_INVALID_API_VERSION= 4;
    const ENVATO_UNKNOWN_ERROR = 5;
    public function __get($property) {
        if (property_exists($this, $property)) {
            return $this->$property;
        } else {
            throw new InvalidArgumentException('Undefined Property: ' . __CLASS__ . '::' . $property);
        }
    }
    public function __set($property, $value) {
        $this->$property = $value;
    }
    /**
     * Class constructor
     * @author Levi Hackwith <levi.hackwith@gmail.com>
     * @access public
     * @return object Instance of EnvatoAPI
     * @param string $version The version of the Envato API to be used
     * @param string $format The default format all API requests should be returned in. Valid values are 'xml' and {@link http://www.json.org/ 'json'}
     * <code>
     * $envatoAPI = new EnvatoAPI('v2', 'xml');
     * </code>
     */
    public function __construct($version, $format) {
        $this->version = $version;
        switch ($format) {
            case 'xml':
            case 'json':
                break;
            default:
                throw new UnexpectedValueException("Invalid format '$format'", self::ENVATO_INVALID_DATA_FORMAT);
        }
        $this->format = $format;
        $this->baseURL = 'http://marketplace.envato.com/api/' . $version;
        return $this;
    }
    /**
     * Retrieves the response from a URL in the format specified in @link __construct()
     * @author Levi Hackwith <levi.hackwith@gmail.com>
     * @access private
     * @throws DomainException
     * @return mixed An instance of {@link http://us2.php.net/SimpleXMLElement SimpleXMLElement}, JSON string
     * @param string $url The URL to retrieve data from
     */
    private function getData($url) {;
        $response = @file_get_contents($url);
        if(!$response) {
            throw new DomainException(__METHOD__ . " Unable to load data from $url", self::ENVATO_INVALID_API_CALL);
            return FALSE;
        }
        switch ($this->format) {
            case 'xml':
                $data = @simplexml_load_string($response);
                break;
            // @codeCoverageIgnoreStart
            case 'json';
                $data = @json_decode($response);
                break;
            // @codeCoverageIgnoreEnd
        }
        return $data;
    }
    /**
     * Generates the URL used to retrieve data from the API
     * @author Levi Hackwith <levi.hackwith@gmail.com>
     * @access private
     * @return string The full URL for the API call
     * @param string $apiCommand The API Command to call
     * @param string $params Additional info that should be tacked on to the {@link baseURL}. Defaults to an empty string

     */
    private function generateURL($apiCommand, $params = '') {
        $params = ($params) ? ':' . $params : $params;
        return $this->baseURL . '/' . $apiCommand . $params . '.' . $this->format;
    }
    public function getSet($set, $params) {
        return $this->getData($this->generateURL($set, $params));
    }
}
?>