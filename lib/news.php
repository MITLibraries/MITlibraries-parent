<?php
/**
* Front page news functions
*
* These functions are called by page-home-direct.php, and control the loading
* of news items from a separate site on the network. This process is 
* documented online at: 
* https://github.com/mitlibraries-ux/MITlibraries-parent/wiki/News
*
*/

$newsBlogID = 7;

function DebugNews() {
    global $newsBlogID;

    echo '<!-- Loading featured news items -->';

    // Switch context to news site
    switch_to_blog($newsBlogID);

    $pool = RetrievePool();

    RenderPool($pool);

    // Restore context back to current site
    restore_current_blog();
}

function LoadNews() {
    global $newsBlogID;

    echo '<!-- Loading featured news items -->';

    // Switch context to news site
    switch_to_blog($newsBlogID);

    $pool = RetrievePool();

    if(count($pool) != 2) {
        // If there are anything other than two items in the pool, then we 
        // summarize the pool and determine query type
        $queryType = SummarizePool($pool);

        // Build the appropriate item pool
        if($queryType === 'two') {
            $pool = QueryPoolTwo();
        } else {
            $pool = QueryPoolOne();
        }
    }
    
    RenderPool($pool);

    // Restore context back to current site
    restore_current_blog();
}

function QueryPoolTwo() {
    // This builds a recordset for two post/bibliotech articles

    $args = array(
        'meta_query' => array(
            array(
                'key' => 'featuredArticle',
                'value' => 'True',
                'compare' => '='
                ),
            ),
        'post_type' => array( 'post' , 'bibliotech'),
        'post_status' => 'publish',
        'posts_per_page' => 2,
        'orderby' => 'rand',
        'ignore_sticky_posts' => 1
    );
    $items = get_posts( $args );

    return $items;
}

function QueryPoolOne() {
    // This builds a recordset for one post/bibliotech and one spotlight article

    // Start by getting post/bibliotech
    $args = array(
        'meta_query' => array(
            array(
                'key' => 'featuredArticle',
                'value' => 'True',
                'compare' => '='
                ),
            ),
        'post_type' => array( 'post' , 'bibliotech'),
        'post_status' => 'publish',
        'posts_per_page' => 1,
        'orderby' => 'rand',
        'ignore_sticky_posts' => 1
    );
    $first = get_posts( $args );

    // Then get the spotlight
    $args = array(
        'meta_query' => array(
            array(
                'key' => 'featuredArticle',
                'value' => 'True',
                'compare' => '='
                ),
            ),
        'post_type' => array( 'spotlights'),
        'post_status' => 'publish',
        'posts_per_page' => 1,
        'orderby' => 'rand',
        'ignore_sticky_posts' => 1
    );
    $second = get_posts( $args );

    // Merge the two
    $items = array_merge($first,$second);

    return $items;
}

function RenderPool($items) {
    // This takes an input recordset of news items and renders it as HTML

    foreach($items as $item) {
        $custom = get_post_custom($item->ID);

        // URL
        if($item->post_type === "post") {
            $url = get_permalink($item->ID);
        } elseif($item->post_type === "bibliotech") {
            $url = str_replace('/news/','/news/bibliotech/',get_permalink($item->ID));
        } elseif($item->post_type === "spotlights") {
            $url = $custom["external_link"][0];
        } else {
            $url = '';
        }

        // Label
        $label = '<div class="category-post">';
        if($item->post_type === "post") {
            if($item->is_event[0] === "1") {
                $label .= "Event";
            } else {
                $label .= "News";
            }
        } else {
            if($item->post_type === "spotlights") {
                if($custom["feature_type"][0] === "fact" || $custom["feature_type"][0] === "tip") {
                    $label .= '<div class="info"></div>' . $custom["feature_type"][0];
                } else {
                    $label .= '<div class="or_star-25"></div>Featured ' . $custom["feature_type"][0];
                }
            } elseif($item->post_type === "bibliotech") {
                $label .= "Bibliotech";
            } else {
                $label .= "Other";
            }
        }
        $label .= '</div>';

        // Headline
        if($custom["homepage_post_title"][0]) {
            $headline = '<h3 class="title-post">' . $custom["homepage_post_title"][0] . '</h3>';
        } else {
            $headline = '<h3 class="title-post">' . $item->post_title . '</h3>';
        }

        // event date, if applicable
        $eventDate = "";
        if($item->post_type === "post" && array_key_exists('is_event', $custom)) {
            if($custom["is_event"][0] === "1") {
                $eventDate = DateTime::createFromFormat('Ymd',$custom["event_date"][0]);
                $eventDate = '<div class="date-event"><img src="/wp-content/themes/libraries/images/calendar.svg" width="13px" height="13px"><span class="event">' . date_format($eventDate,'F j') . '</span>';
                if($custom["event_start_time"][0]!= '') {
                    $eventDate = $eventDate . '<span class="time-event"> ' . $custom["event_start_time"][0];
                };
                if($custom["event_end_time"][0] != '') {
                    $eventDate = $eventDate . " - " . $custom["event_end_time"][0];
                };
                if($custom["event_start_time"][0] != '') {
                    $eventDate = $eventDate . '</span>';
                };
                $eventDate = $eventDate . "</div>";
            }
        }

        // Highlight image
        $imageElement = "";
        if($item->post_type === "post" || $item->post_type === "bibliotech") {
            if($custom["homeImg"][0] != "") {
                $image = json_decode($custom["homeImg"][0]);
                // We use "original" even though this is already cropped to avoid cropping again
                $imageURL = wp_get_attachment_image_src( $image->cropped_image, 'original');
                $imageURL = str_replace('/wp-content/uploads/','/news/files/',$imageURL[0]);
                $imageElement = '<div class="image" style="background-image: url(' . $imageURL . ')"></div>';
            }
        }

        echo '<a class="post--full-bleed no-underline flex-container" href="' . $url . '">';
        echo '<div class="excerpt-news">';
        echo $label;
        echo $headline;
        echo $eventDate;
        echo '</div>';
        echo $imageElement;
        echo '</a>';
    }

}

function RetrievePool() {
    // This characterizes the pool of eligible articles, and then calls the 
    // relevant query builder

    // Get all eligible articles
    $args = array(
        'meta_query' => array(
            array(
                'key' => 'featuredArticle',
                'value' => 'True',
                'compare' => '='
            ),
        ),
        'post_type' => array( 'post' , 'bibliotech' , 'spotlights' ),
        'post_status' => 'publish',
        'posts_per_page' => 99,
        'orderby' => 'rand',
        'ignore_sticky_posts' => 1
    );
    $items = get_posts( $args );

    return $items;
    
}

function SummarizePool($items) {
    // This takes the pool of all eligible news items, determines how many of
    // each type exist, and determines what type of query is needed to 
    // populate the front page.

    // Summarize article list
    $summary = array(
        'news' => 0,
        'spotlights' => 0,
        'other' => 0,
        'total' => 0,
    );
    foreach($items as $item) {
        if($item->post_type === 'post' || $item->post_type === 'bibliotech') {
            $summary["news"]++;
        } elseif($item->post_type === 'spotlights') {
            $summary["spotlights"]++;
        } else {
            $summary["other"]++;
        };
        $summary["total"]++;
    }

    // Determine query type based on summary results
    if($summary["news"] === 1) {
        // Only one eligible news item - so we set type to one
        $type = "one";
    } elseif($summary["spotlights"] === 0) {
        // No eligible spotlights - so we show two news items
        $type = "two";
    } else {
        // More than one news item - so we flip a coin for type
        if (mt_rand(0,1)) {
            $type = "two";
        } else {
            $type = "one";
        }
    }

    return $type;
}
