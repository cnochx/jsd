function Toggle() {

    //* Switch the background for the Slideshow
    this.switch = function(id) {
        // Re-create the Teaserimage
        this.slideBackground(id);
        // Re-Create the Breadcrump
        this.recreateBreadcrumps(id);
        // Re-create the Articels
        this.articlePanel(id);
    }

    this.fade = function(id) {
        let idTsr = '#' + id + '_tsr';
        let idHdr = '#' + id + '_tsr_hdr';
        let idImg = '#' + id + '_tsr_img';

        // Check, if the #ID for class teaser exist to remove that
        if (!$(idTsr).hasClass('teaser')) {
            $(idTsr).addClass('teaser').removeClass('toggle_rtcl');
            // Check the #ID from Overlay Header and add the Classes for display in flexbox
            if ($(idHdr).hasClass('toggle_hdr')) {
                $(idHdr).removeClass('toggle_hdr');
            }
            // Check the #ID from Overlay Header and add the Classes for display in flexbox
            if ($(idImg).hasClass('toggle_img')) {
                $(idImg).removeClass('toggle_img');
            }
        }
    }

    this.slideBackground = function(id) {
        //* Re-create the Teaserimage
        let idTsr = '#' + id + '_tsr';
        let idHdr = '#' + id + '_tsr_hdr';
        let idImg = '#' + id + '_tsr_img';

        // Check, if the #ID for class teaser exist to remove that
        if ($(idTsr).hasClass('teaser')) {
            $(idTsr).addClass('toggle_rtcl').removeClass('teaser');
            // Check the# ID from Overlay Header and add the Classes
            // for display in flexbox
            if (!$(idHdr).hasClass('toggle_hdr')) {
                $(idHdr).addClass('toggle_hdr');
            }
            // Check the #ID from Overlay Header and add the Classes for display in flexbox
            if (!$(idImg).hasClass('toggle_img')) {
                $(idImg).addClass('toggle_img');
            }
        }
    }

    this.recreateBreadcrumps = function(id) {
        //* Re-Create the Breadcrump
        if (localStorage.getItem(id) != null) {
            let bcNode = localStorage.getItem(id);
            $('.element_three').html(bcNode)
        }
    }

    this.articlePanel = function(id) {
        //* Re-Create the Artikel-Panel
        // transform id to used DOM-ID /DOM-Class
        let artcl = '#' + id + '_rtcl';

        // Get the IndexIds from localStorage
        var RtrvdIndexIds = JSON.parse(localStorage.getItem('indexids'));
        // loop that IndexIds
        for (let key of Object.keys(RtrvdIndexIds.indexes)) {
            let value = RtrvdIndexIds.indexes[key];
            // transform id to used DOM-ID /DOM-Class
            let valueClass = 'rtcl_bottom';
            // transform id to used DOM-ID
            if (value == id) {
                // Check, if the #ID for has rtcl_bottom and replace that with rtcl_panel
                if ($(artcl).hasClass(valueClass)) {
                    $(artcl).addClass('rtcl_panel').removeClass('rtcl_bottom');
                    // Append Element as first Child in section#slide_panel
                    $('.rtcl_panel').prependTo("#slide_panel");
                }
                // Check, if the #ID for has rtcl_panel and replace that with rtcl_bottom
            } else {
                let elementId = '#' + value + '_rtcl';
                if ($(elementId).hasClass('rtcl_panel')) {
                    $(elementId).addClass('rtcl_bottom').removeClass('rtcl_panel');
                    // append Element as last Child in Main#bottom
                    $('.rtcl_bottom').appendTo("#bottom");
                }
            }
        }
    }
}