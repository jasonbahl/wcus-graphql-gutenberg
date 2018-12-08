<?php
/**
 * Plugin Name: WCUS - Gutenblocks
 * Plugin URI: https://github.com/jasonbahl/wcus-gutenblocks
 * Description: Example Gutenberg Blocks for WordCamp US 2018. Scaffolded using Create Guten Block by Ahmad Awais.
 * Author: jasonbahl
 * Author URI: https://jasonbahl.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

add_theme_support( 'post-thumbnails', array( 'post' ) );
