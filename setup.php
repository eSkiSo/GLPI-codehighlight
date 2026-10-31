<?php

use Glpi\Plugin\Hooks;

define('PLUGIN_CODEHIGHLIGHT_VERSION', '1.0.0');

/**
 * Plugin initialization.
 */
function plugin_init_codehighlight() {
    global $PLUGIN_HOOKS;
    $PLUGIN_HOOKS[Hooks::ADD_JAVASCRIPT]['codehighlight'][] = 'js/codehighlight.js';
}

/**
 * Plugin metadata.
 */
function plugin_version_codehighlight() {
    return [
        'name'         => 'Code Highlight',
        'version'      => PLUGIN_CODEHIGHLIGHT_VERSION,
        'author'       => 'Manuel Raposo',
        'homepage'     => 'https://github.com/eSkiSo/GLPI-codehighlight', 
        'license'      => 'GPLv3+',
        'requirements' => [
            'glpi' => [
                'min' => '12.0.0',
                'max' => '12.99.99',
            ],
        ],
    ];
}

/**
 * Check plugin prerequisites.
 */
function plugin_codehighlight_check_prerequisites() {
    if (version_compare(GLPI_VERSION, '12.0.0', '<')) {
        echo 'This plugin requires GLPI 12.0.0 or newer.';
        return false;
    }

    return true;
}

/**
 * Check plugin configuration.
 */
function plugin_codehighlight_check_config($verbose = false) {
    return true;
}
