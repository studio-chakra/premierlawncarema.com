<?php
namespace Craft;

class SproutActiveTwigExtension extends \Twig_Extension
{
  /**
   * Plugin Name
   * 
   * @return string
   */
  public function getName()
  {
    return 'Sprout Active';
  }

  /**
   * Create our Twig Functions
   * 
   * @return array
   */
  public function getFunctions()
  {
    return array(
      'active' => new \Twig_Function_Method($this, 'getActive'),
      'activeClass' => new \Twig_Function_Method($this, 'getActiveClass', array('is_safe' => array('html'))),
      'segment' => new \Twig_Function_Method($this, 'getSegment'),
      'segmentClass' => new \Twig_Function_Method($this, 'getSegmentClass', array('is_safe' => array('html')))
    );
  }

  /**
   * Output the classname if conditions match
   * 
   * @param  string  $string    Value from URL to use in test
   * @param  integer $segment   URL segment to test against
   * @param  string  $className Value of CSS class to return to template
   * @return string OR null          
   */
  public function getActive($string = '', $segment = 1, $className = 'active')
  {
    $match = craft()->sproutActive->match($string, $segment);

    return ($match) ? $className : null;
  }

  /**
   * Output the classname and class parameter if conditionals match
   * 
   * @param  string  $string    Value from URL to use in test
   * @param  integer $segment   URL segment to test against
   * @param  mixed  $className Value of CSS class to return to template
   * @return mixed OR null
   */
  public function getActiveClass($string = '', $segment = 1, $className = 'active')
  { 
    $match = craft()->sproutActive->match($string, $segment);
    
    $activeClassString = 'class="' . $className . '"';

    return ($match) ? $activeClassString : null;
  }

  /**
   * Output the segment if conditions match
   * 
   * @param  integer $segment URL segment to test for
   * @return string OR null   Value of URL segment if it exists
   */
  public function getSegment($segment = null)
  {
    return craft()->request->getSegment($segment);
  }

  /**
   * Output the segment and class parameter if conditions match
   * 
   * @param  integer $segment URL segment to test for
   * @return mixed OR null    Value of URL segment wrapped in class parameter if it exists
   */
  public function getSegmentClass($segment = null)
  {
    $segment = craft()->request->getSegment($segment);
    $segmentClassString = 'class="' . $segment . '"';

    return $segmentClassString;
  }
  
}
