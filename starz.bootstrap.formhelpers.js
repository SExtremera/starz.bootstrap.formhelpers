/**
 * bootstrap-formhelpers.js v2.3.0 by @vincentlamanna
 * Copyright 2013 Vincent Lamanna
 * http://www.apache.org/licenses/LICENSE-2.0
 */
if (!jQuery) { throw new Error("Bootstrap Form Helpers requires jQuery"); }

/* ==========================================================
 * bootstrap-formhelpers-countries.en_US.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

var BFHCountriesListEnglish = {
    'DZ': 'Algeria',
    'BH': 'Bahrain',
    'DJ': 'Djibouti',
    'EG': 'Egypt',
    'IQ': 'Iraq',
    'JO': 'Jordan',
    'KW': 'Kuwait',
    'LB': 'Lebanon',
    'LY': 'Libya',
    'MR': 'Mauritania',
    'MA': 'Morocco',
    'OM': 'Oman',
    'PS': 'Palestine',
    'QA': 'Qatar',
    'SA': 'Saudi Arabia',
    'TN': 'Tunisia',
    'AE': 'UAE',
    'RW': 'Rest of World'
};
var BFHCountriesListArabic = {
    'DZ': 'الجزائر',
    'BH': 'البحرين',
    'DJ': 'جيبوتي',
    'EG': 'مصر',
    'IQ': 'عراق',
    'JO': 'الأردن',
    'KW': 'الكويت',
    'LB': 'لبنان',
    'LY': 'ليبيا',
    'MR': 'موريتانيا',
    'MA': 'المغرب',
    'OM': 'عمان',
    'PS': 'فلسطين',
    'QA': 'قطر',
    'SA': 'السعودية',
    'TN': 'تونس',
    'AE': 'الإمارات',
    'RW': 'الدول الأخرى'
};
var BFHCountriesList = BFHCountriesListEnglish;

var BFHCountryPrefixesList = {
    'DZ': '+213',
    'BH': '+973',
    'DJ': '+253',
    'EG': '+20',
    'IQ': '+964',
    'JO': '+962',
    'KW': '+965',
    'LB': '+961',
    'LY': '+218',
    'MR': '+222',
    'MA': '+212',
    'OM': '+968',
    'PS': '+970',
    'QA': '+974',
    'SA': '+966',
    'TN': '+216',
    'AE': '+971',
    'RW': ''
};


/* ==========================================================
 * bootstrap-formhelpers-selectbox.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

    'use strict';


    /* SELECTBOX CLASS DEFINITION
     * ========================= */

    var toggle = '[data-toggle=bfh-selectbox]',
        BFHSelectBox = function (element, options) {
            this.options = $.extend({}, $.fn.bfhselectbox.defaults, options);
            this.$element = $(element);

            this.initSelectBox();
        };

    BFHSelectBox.prototype = {

        constructor: BFHSelectBox,

        initSelectBox: function () {
            var options;

            options = '';
            this.$element.find('div').each(function() {
                options = options + '<li><a tabindex="-1" href="#" data-option="' + $(this).data('value') + '">' + $(this).html() + '</a></li>';
            });

            this.$element.html(
                '<input type="hidden" name="' + this.options.name + '" value="">' +
                '<a class="bfh-selectbox-toggle ' + this.options.input + '" role="button" data-toggle="bfh-selectbox" href="#">' +
                '<span class="bfh-selectbox-option"></span>' +
                '<span class="' + this.options.icon + ' selectbox-caret"></span>' +
                '</a>' +
                '<div class="bfh-selectbox-options">' +
                '<div role="listbox">' +
                '<ul role="option">' +
                '</ul>' +
                '</div>' +
                '</div>'
            );

            this.$element.find('[role=option]').html(options);

            if (this.options.filter === true) {
                this.$element.find('.bfh-selectbox-options').prepend('<div class="bfh-selectbox-filter-container"><input type="text" class="bfh-selectbox-filter form-control"></div>');
            }

            this.$element.val(this.options.value);

            if(this.$element.data("label") != "") {
                var label = $("#" + this.$element.data("label"));
                label.addClass("into_combo");
                this.$element.prepend(label.show());
            }

            this.$element
                .on('click.bfhselectbox.data-api touchstart.bfhselectbox.data-api', toggle, BFHSelectBox.prototype.toggle)
                .on('keydown.bfhselectbox.data-api', toggle + ', [role=option]' , BFHSelectBox.prototype.keydown)
                .on('mouseenter.bfhselectbox.data-api', '[role=option] > li > a', BFHSelectBox.prototype.mouseenter)
                .on('click.bfhselectbox.data-api', '[role=option] > li > a', BFHSelectBox.prototype.select)
                .on('click.bfhselectbox.data-api', '.bfh-selectbox-filter', function () { return false; })
                .on('propertychange.bfhselectbox.data-api change.bfhselectbox.data-api input.bfhselectbox.data-api paste.bfhselectbox.data-api', '.bfh-selectbox-filter', BFHSelectBox.prototype.filter);
        },

        toggle: function (e) {
            var $this,
                $parent,
                isActive;

            $this = $(this);
            $parent = getParent($this);

            if ($parent.is('.disabled') || $parent.attr('disabled') !== undefined) {
                return true;
            }

            isActive = $parent.hasClass('open');

            clearMenus();

            if (!isActive) {
                $parent.trigger(e = $.Event('show.bfhselectbox'));

                if (e.isDefaultPrevented()) {
                    return true;
                }

                $parent
                    .toggleClass('open')
                    .trigger('shown.bfhselectbox')
                    .find('[role=option] > li > [data-option="' + $parent.val() + '"]').focus();
            }

            return false;
        },

        filter: function() {
            var $this,
                $parent,
                $items;

            $this = $(this);
            $parent = getParent($this);

            $items = $('[role=option] li a', $parent);
            $items
                .hide()
                .filter(function() {
                    return ($(this).text().toUpperCase().indexOf($this.val().toUpperCase()) !== -1);
                })
                .show();
        },

        keydown: function (e) {
            var $this,
                $items,
                $parent,
                $subItems,
                isActive,
                index,
                selectedIndex;

            if (!/(38|40|27)/.test(e.keyCode)) {
                return true;
            }

            $this = $(this);

            e.preventDefault();
            e.stopPropagation();

            $parent = getParent($this);
            isActive = $parent.hasClass('open');

            if (!isActive || (isActive && e.keyCode === 27)) {
                if (e.which === 27) {
                    $parent.find(toggle).focus();
                }

                return $this.click();
            }

            $items = $('[role=option] li:not(.divider) a:visible', $parent);

            if (!$items.length) {
                return true;
            }

            $('body').off('mouseenter.bfh-selectbox.data-api', '[role=option] > li > a', BFHSelectBox.prototype.mouseenter);
            index = $items.index($items.filter(':focus'));

            if (e.keyCode === 38 && index > 0) {
                index = index - 1;
            }

            if (e.keyCode === 40 && index < $items.length - 1) {
                index = index + 1;
            }

            if (!index) {
                index = 0;
            }

            $items.eq(index).focus();
            $('body').on('mouseenter.bfh-selectbox.data-api', '[role=option] > li > a', BFHSelectBox.prototype.mouseenter);
        },

        mouseenter: function () {
            var $this;

            $this = $(this);

            $this.focus();
        },

        select: function (e) {
            var $this,
                $parent,
                $span,
                $input;

            $this = $(this);

            e.preventDefault();
            e.stopPropagation();

            if ($this.is('.disabled') || $this.attr('disabled') !== undefined) {
                return true;
            }

            $parent = getParent($this);

            $(".into_combo", $parent).remove();
            $parent.val($this.data('option'));
            $parent.trigger('change.bfhselectbox');

            clearMenus();
        }

    };

    function clearMenus() {
        var $parent;

        $(toggle).each(function (e) {
            $parent = getParent($(this));

            if (!$parent.hasClass('open')) {
                return true;
            }

            $parent.trigger(e = $.Event('hide.bfhselectbox'));

            if (e.isDefaultPrevented()) {
                return true;
            }

            $parent
                .removeClass('open')
                .trigger('hidden.bfhselectbox');
        });
    }

    function getParent($this) {
        return $this.closest('.bfh-selectbox');
    }


    /* SELECTBOX PLUGIN DEFINITION
     * ========================== */

    var old = $.fn.bfhselectbox;

    $.fn.bfhselectbox = function (option) {
        return this.each(function () {
            var $this,
                data,
                options;

            $this = $(this);
            data = $this.data('bfhselectbox');
            options = typeof option === 'object' && option;
            this.type = 'bfhselectbox';

            if (!data) {
                $this.data('bfhselectbox', (data = new BFHSelectBox(this, options)));
            }
            if (typeof option === 'string') {
                data[option].call($this);
            }
        });
    };

    $.fn.bfhselectbox.Constructor = BFHSelectBox;

    $.fn.bfhselectbox.defaults = {
        icon: 'caret',
        input: 'form-control',
        name: '',
        value: '',
        filter: false
    };


    /* SELECTBOX NO CONFLICT
     * ========================== */

    $.fn.bfhselectbox.noConflict = function () {
        $.fn.bfhselectbox = old;
        return this;
    };


    /* SELECTBOX VALHOOKS
     * ========================== */

    var origHook;
    if ($.valHooks.div){
        origHook = $.valHooks.div;
    }
    $.valHooks.div = {
        get: function(el) {
            if ($(el).hasClass('bfh-selectbox')) {
                return $(el).find('input[type="hidden"]').val();
            } else if (origHook) {
                return origHook.get(el);
            }
        },
        set: function(el, val) {
            var $el,
                html;

            if ($(el).hasClass('bfh-selectbox')) {

                $el = $(el);
                if ($el.find('li a[data-option=\'' + val + '\']').length > 0) {
                    html = $el.find('li a[data-option=\'' + val + '\']').html();
                } else if ($el.find('li a').length > 0) {
                    html = $el.find('li a').eq(0).html();
                } else {
                    val = '';
                    html = '';
                }

                $el.find('input[type="hidden"]').val(val);
                $el.find('.bfh-selectbox-option').html(html);
            } else if (origHook) {
                return origHook.set(el,val);
            }
        }
    };


    /* SELECTBOX DATA-API
     * ============== */

    $(document).ready( function () {
        $('div.bfh-selectbox').each(function () {
            var $selectbox;

            $selectbox = $(this);

            $selectbox.bfhselectbox($selectbox.data());
        });
    });


    /* APPLY TO STANDARD SELECTBOX ELEMENTS
     * =================================== */

    $(document)
        .on('click.bfhselectbox.data-api', clearMenus);

}(window.jQuery);

/* ==========================================================
 * bootstrap-formhelpers-countries.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2012 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

+function ($) {

    'use strict';


    /* COUNTRIES CLASS DEFINITION
     * ====================== */

    var BFHCountries = function (element, options) {
        this.options = $.extend({}, $.fn.bfhcountries.defaults, options);
        this.$element = $(element);

        if (this.$element.is('select')) {
            this.addCountries();
        }

        if (this.$element.hasClass('bfh-selectbox')) {
            this.addBootstrapCountries();
        }

        if (this.$element.is('span')) {
            this.displayCountry();
        }
    };

    BFHCountries.prototype = {

        constructor: BFHCountries,

        getCountries: function() {
            var country,
                countries = [],
                getExcludedCountriesList = function(excludedCountries) {
                    if(typeof excludedCountries === 'string') {
                        excludedCountries = excludedCountries.split(',');
                    }
                    return excludedCountries;
                },
                isCountryInExcludedList = function(country, list) {
                    return ($.inArray(country, list) !== -1);
                },
                getLocalizedCountries = function (locale) {
                    var localizedCountries = null;
                    switch (locale) {
                        case 'ar':
                            localizedCountries = BFHCountriesListArabic;
                            break;
                        case 'en':
                        default:
                            localizedCountries = BFHCountriesListEnglish;
                            break;
                    }
                    return localizedCountries;
                };
            this.options.locale = this.options.locale ? this.options.locale.toLowerCase() : undefined;
            var BFHCountriesList = getLocalizedCountries(this.options.locale);

            if (this.options.available) {
                if (typeof this.options.available === 'string') {

                    this.options.available = this.options.available.split(',');

                    this.options.exclude = getExcludedCountriesList(this.options.exclude);

                    for (country in BFHCountriesList) {
                        if (BFHCountriesList.hasOwnProperty(country)) {
                            if ($.inArray(country, this.options.available) >= 0 && !isCountryInExcludedList(country, this.options.exclude)) {
                                countries[country] = BFHCountriesList[country];
                            }
                        }
                    }
                } else {
                    countries = this.options.available;
                }
                return countries;

            } else {
                if(this.options.exclude) {
                    this.options.exclude = getExcludedCountriesList(this.options.exclude);
                    for (country in BFHCountriesList) {
                        if (BFHCountriesList.hasOwnProperty(country)) {
                            if (!isCountryInExcludedList(country, this.options.exclude)) {
                                countries[country] = BFHCountriesList[country];
                            }
                        }
                    }
                    return countries;
                } else {
                    return BFHCountriesList;
                }
            }
        },

        addCountries: function () {
            var value,
                country,
                countries;

            value = this.options.country;
            countries = this.getCountries();

            this.$element.html('');

            if (this.options.blank === true) {
                this.$element.append('<option value=""></option>');
            }

            for (country in countries) {
                if (countries.hasOwnProperty(country)) {
                    this.$element.append('<option value="' + country + '">' + countries[country] + '</option>');
                }
            }

            this.$element.val(value);
        },

        addBootstrapCountries: function() {
            var $input,
                $toggle,
                $options,
                value,
                country,
                countries,
                listItem;

            value = this.options.country;
            $input = this.$element.find('input[type="hidden"]');
            $toggle = this.$element.find('.bfh-selectbox-option');
            $options = this.$element.find('[role=option]');
            countries = this.getCountries();

            $options.html('');

            if (this.options.blank === true) {
                $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
            }

            for (country in countries) {
                if (countries.hasOwnProperty(country)) {
                    if (this.options.flags === true) {
                        if (this.options.prefix === true) {
                            listItem = '<li><a class="bfh-selector-countryname" tabindex="-1" href="#" data-option="' + country + '"><i class="glyphicon bfh-flag-' + country + '"></i>' + countries[country] +
                                '<span class="bfh-selectbox-prefix">' + BFHCountryPrefixesList[country] + '</span></a></li>';
                        } else {
                            listItem = '<li><a tabindex="-1" href="#" data-option="' + country + '"><i class="glyphicon bfh-flag-' + country + '"></i>' + countries[country] + '</a></li>';
                        }
                    } else {
                        if (this.options.prefix === true) {
                            listItem = '<li><a class="bfh-selector-countryname" tabindex="-1" href="#" data-option="' + country + '">' + countries[country] +
                                '<span class="bfh-selectbox-prefix">' + BFHCountryPrefixesList[country] + '</span></a></li>';
                        } else {
                            listItem = '<li><a tabindex="-1" href="#" data-option="' + country + '">' + countries[country] + '</a></li>';
                        }
                    }
                    $options.append(listItem);
                }
            }

            this.$element.val(value);
        },

        displayCountry: function () {
            var value;

            value = this.options.country;

            if (this.options.flags === true) {
                this.$element.html('<i class="glyphicon bfh-flag-' + value + '"></i> ' + BFHCountriesList[value]);
            } else {
                this.$element.html(BFHCountriesList[value]);
            }
        }

    };


    /* COUNTRY PLUGIN DEFINITION
     * ======================= */

    var old = $.fn.bfhcountries;

    $.fn.bfhcountries = function (option) {
        return this.each(function () {
            var $this,
                data,
                options;

            $this = $(this);
            data = $this.data('bfhcountries');
            options = typeof option === 'object' && option;

            if (!data) {
                $this.data('bfhcountries', (data = new BFHCountries(this, options)));
            }
            if (typeof option === 'string') {
                data[option].call($this);
            }
        });
    };

    $.fn.bfhcountries.Constructor = BFHCountries;

    $.fn.bfhcountries.defaults = {
        country: '',
        available: '',
        flags: false,
        blank: true
    };


    /* COUNTRY NO CONFLICT
     * ========================== */

    $.fn.bfhcountries.noConflict = function () {
        $.fn.bfhcountries = old;
        return this;
    };


    /* COUNTRY DATA-API
     * ============== */

    $(document).ready( function () {
        $('form select.bfh-countries, span.bfh-countries, div.bfh-countries').each(function () {
            var $countries;

            $countries = $(this);

            if ($countries.hasClass('bfh-selectbox')) {
                $countries.bfhselectbox($countries.data());
            }
            $countries.bfhcountries($countries.data());
        });
    });

}(window.jQuery);