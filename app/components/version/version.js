'use strict';

angular.module('StorySeedsApp.version', [
  'StorySeedsApp.version.interpolate-filter',
  'StorySeedsApp.version.version-directive'
])

.value('version', '0.1');
