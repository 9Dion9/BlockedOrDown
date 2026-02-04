/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blocked-or-down.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 10000, // safe for 1000+ URLs
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/api/*'],
  additionalPaths: async (config) => {
    const popularSites = [
      // Social & Messaging (top volume)
      'facebook-com', 'instagram-com', 'twitter-com', 'tiktok-com', 'snapchat-com',
      'discord-com', 'telegram-org', 'whatsapp-com', 'signal-org', 'wechat-com',

      // Streaming & Entertainment
      'youtube-com', 'netflix-com', 'disneyplus-com', 'hulu-com', 'primevideo-com',
      'hbomax-com', 'paramountplus-com', 'peacocktv-com', 'crunchyroll-com', 'plex-tv',

      // Gaming & Platforms
      'roblox-com', 'minecraft-net', 'fortnite-com', 'epicgames-com', 'steam-com',
      'playstation-com', 'xbox-com', 'nintendo-com', 'riotgames-com', 'blizzard-com',
      'twitch-tv', 'kick-com', 'rumble-com', 'trovo-live', 'dailymotion-com',

      // Search & AI Tools
      'google-com', 'grok-com', 'chatgpt-com', 'openai-com', 'claude-ai',
      'gemini-google', 'perplexity-ai', 'midjourney-com', 'deepseek-ai', 'anthropic-com',

      // Productivity & Cloud
      'notion-so', 'slack-com', 'teams-microsoft', 'zoom-us', 'google-drive',
      'dropbox-com', 'onedrive-com', 'mega-nz', 'pcloud-com', 'sync-com',

      // Finance & Crypto
      'paypal-com', 'stripe-com', 'binance-com', 'coinbase-com', 'kraken-com',
      'revolut-com', 'wise-com', 'venmo-com', 'cashapp-com', 'robinhood-com',

      // Shopping & E-commerce
      'amazon-com', 'ebay-com', 'aliexpress-com', 'etsy-com', 'walmart-com',
      'target-com', 'bestbuy-com', 'shein-com', 'temu-com', 'wish-com',

      // News & Knowledge
      'wikipedia-org', 'reddit-com', 'nytimes-com', 'cnn-com', 'bbc-co-uk',
      'foxnews-com', 'theguardian-com', 'washingtonpost-com', 'bloomberg-com', 'reuters-com',

      // Other High-Traffic
      'linkedin-com', 'pinterest-com', 'spotify-com', 'soundcloud-com', 'bandcamp-com',
      'patreon-com', 'kickstarter-com', 'onlyfans-com', 'pornhub-com', 'xvideos-com',
      'github-com', 'stackoverflow-com', 'npmjs-com', 'pypi-org', 'canva-com',
      'figma-com', 'grammarly-com', 'deepl-com', 'zoho-com', 'trello-com',
      'youtube-com', 'blogger-com', 'google-com', 'wordpress-org', 'linkedin-com', 'googleusercontent-com', 'apple-com', 'microsoft-com', 'play-google-com', 'support-google-com',
      'youtu-be', 'cloudflare-com', 'policies-google-com', 'whatsapp-com', 'docs-google-com', 'tiktok-com', 'maps-google-com', 'en-wikipedia-org', 'bp-blogspot-com', 't-me',
      'drive-google-com', 'accounts-google-com', 'mozilla-org', 'plus-google-com', 'wa-me', 'europa-eu', 'x-com', 'weebly-com', 'es-wikipedia-org', 'sites-google-com',
      'vk-com', 'facebook-com', 'pt-wikipedia-org', 'vimeo-com', 'github-com', 'adobe-com', 'istockphoto-com', 'netvibes-com', 'googleblog-com', 'tools-google-com',
      'yahoo-com', 'forms-gle', 'jimdofree-com', 'w3-org', 'cpanel-net', 'dropbox-com', 'uol-com-br', 'wikimedia-org', 'ok-ru', 'news-google-com',
      'globo-com', 'fr-wikipedia-org', 'nytimes-com', 'dailymotion-com', 'google-es', 'draft-blogger-com', 'abril-com-br', 'medium-com', 'developers-google-com', 'gravatar-com',
      'amazon-com', 'mediafire-com', 'files-wordpress-com', 'goo-gl', 'bbc-co-uk', 'brandbucket-com', 'myspace-com', 'shopify-com', 'nih-gov', 'gstatic-com',
      'cnn-com', 'who-int', 'google-com-br', 'feedburner-com', 'opera-com', 'live-com', 'afternic-com', 'google-de', 'line-me', 'imdb-com',
      'paypal-com', 'foxnews-com', 'oracle-com', 'amazon-co-uk', '4shared-com', 'picasaweb-google-com', 'huffingtonpost-com', 'get-google-com', 'twitch-tv', 'namebright-com',
      'estadao-com-br', 'businessinsider-com', 'slideshare-net', 'correios-com-br', 'issuu-com', 'ig-com-br', 'nicsell-com', 'gov-uk', 'ft-com', 'hugedomains-com',
      'ytimg-com', 'domainmarket-com', 'cdc-gov', 'nature-com', 'usatoday-com', 'dailymail-co-uk', 'washingtonpost-com', 'scribd-com', 'expireddomains-net', 'independent-co-uk',
      'discord-com', 'storage-googleapis-com', 'tinyurl-com', 'bbc-com', 'messenger-com', 'pixabay-com', 'telegram-me', 'theguardian-com', 'instagram-com', 'aliexpress-com',
      'researchgate-net', 'dan-com', 'archive-org', 'twitter-com', 'google-it', 'webmd-com', 'myaccount-google-com', 'msn-com', 'google-fr', 'photos-google-com',
      'amazon-co-jp', 'google-co-jp', 'bloomberg-com', 'typepad-com', 'fandom-com', 'google-co-uk', 'linktr-ee', 'thesun-co-uk', 'fb-com', 'forbes-com',
      'mail-ru', 'wiley-com', 'wix-com', 'plesk-com', 'list-manage-com', 'buydomains-com', 'hatena-ne-jp', 'un-org', 'mail-google-com', 'telegraph-co-uk',
      'mirror-co-uk', 'adssettings-google-com', '3ds-com', 'pinterest-com', 'marketingplatform-google-com', 'indiatimes-com', 'creativecommons-org', 'nginx-com', 'nginx-org', 'terra-com-br',
      'spotify-com', 'news-yahoo-com', 'bit-ly', 'youronlinechoices-com', 'wsj-com', 'wp-com', 'huawei-com', 'huffpost-com', 'office-com', 't-co',
      'booking-com', 'time-com', 'reuters-com', 'sedo-com', 'aboutads-info', 'ru-wikipedia-org', 'de-wikipedia-org', 'ovhcloud-com', 'elpais-com', 'gov-br',
      'planalto-gov-br', 'enable-javascript-com', 'ibm-com', 'britannica-com', 'buzzfeed-com', 'nhk-or-jp', 'techcrunch-com', 'yahoo-co-jp', 'ebay-com', 'zoom-us',
      'lemonde-fr', 'newsweek-com', 'nasa-gov', 'home-pl', 'amzn-to', 'economist-com', 'photos1-blogger-com', 'example-com', 'imageshack-us', 'secureserver-net',
      'addthis-com', 'perfectdomain-com', 'hp-com', 'livejournal-com', 'amazon-es', 'oup-com', 'tmz-com', 'latimes-com', 'steampowered-com', 'akamaihd-net',
      'npr-org', 'hotmart-com', 'liveinternet-ru', 'm-wikipedia-org', 'bandcamp-com', 'instructables-com', 'ouest-france-fr', 'cointernet-com-co', 'twimg-com', 'change-org',
      'ssl-images-amazon-com', 'kickstarter-com', 'groups-google-com', 'walmart-com', 'ign-com', 'ovh-com', 'abc-net-au', 'as-com', 'google-nl', 'canva-com',
      'calameo-com', 'dreamstime-com', 'whitehouse-gov', 'guardian-co-uk', 'cnet-com', 'francetvinfo-fr', 'playstation-com', 'plos-org', 'clickbank-net', 'hollywoodreporter-com',
      'samsung-com', 'trustpilot-com', 'ted-com', 'lin-ee', 'cbsnews-com', 'my-yahoo-com', 'rakuten-co-jp', 'namecheap-com', 'networkadvertising-org', 'yelp-com',
      'amazon-fr', 'thenai-org', 'search-yahoo-com', 'discord-gg', 'bloglovin-com', 'telegram-org', 'books-google-com', 'leparisien-fr', 'ipv4-google-com', 'it-wikipedia-org',
      'news-com-au', 'disqus-com', 'g-co', 'privacyshield-gov', 'id-wikipedia-org', 'loc-gov', 'php-net', 'ggpht-com', 'wikia-com', 'ja-wikipedia-org',
      'yandex-ru', 'express-co-uk', 'zippyshare-com', 'dw-com', 'abcnews-go-com', 'pexels-com', 'netflix-com', 'sagepub-com', 'addtoany-com', 'unesco-org',
      'mystrikingly-com', 'nydailynews-com', 'themeforest-net', 'detik-com', 'picasa-google-com', 'shutterstock-com', 'code-google-com', 'lefigaro-fr', 'mega-nz', 't-online-de',
      'abc-es', 'arxiv-org', 'unsplash-com', 'quora-com', 'deezer-com', 'gizmodo-com', 'dailystar-co-uk', 'outlook-com', 'sky-com', 'psychologytoday-com',
      'cpanel-com', 'gofundme-com', 'weibo-com', 'cornell-edu', 'workspace-google-com', 'pl-wikipedia-org', 'nypost-com', 'mozilla-com', 'business-google-com', 'timeweb-ru',
      'pbs-org', 'rtve-es', 'skype-com', 'vkontakte-ru', 'welt-de', 'tripadvisor-com', 'hubspot-com', 'safety-google', 'soundcloud-com', 'eventbrite-com',
      'wikihow-com', 'metro-co-uk', 'cnil-fr', 'stanford-edu', 'rt-com', 'rambler-ru', 'bing-com', 'google-pl', 'lavanguardia-com', 'sakura-ne-jp',
      'standard-co-uk', 'android-com', 'nikkei-com', 'springer-com', 'nbcnews-com', 'apache-org', 'cnbc-com', 'google-ru', 'netlify-app', 'godaddy-com',
      'cambridge-org', 'ea-com', 'offset-com', 'taringa-net', 'ikea-com', 'qq-com', 'academia-edu', 'sapo-pt', 'redbull-com', 'gmail-com',
      'vistaprint-com', 'sendspace-com', 'photobucket-com', 'zendesk-com', 'aol-com', 'thetimes-co-uk', 'surveymonkey-com', 'amazonaws-com', 'amazon-de', 'translate-google-com',
      'wikipedia-org', 'firefox-com', 'wiktionary-org', 'engadget-com', 'sciencedirect-com', '20minutos-es', 'nationalgeographic-com', 'dovendi-com', 't-ly', 'spiegel-de',
      'alicdn-com', 'mashable-com', 'cbc-ca', 'nintendo-com', 'harvard-edu', 'behance-net', 'hindustantimes-com', 'espn-com', 'mit-edu', 'doi-org',
      'rapidshare-com', 'statista-com', 'goodreads-com', 'wired-com', 'doubleclick-net', 'finance-yahoo-com', 'marca-com', 'theatlantic-com', 'icann-org', 'naver-com',
      'ziddu-com', 'variety-com', 'cutt-ly', 'telegra-ph', 'elmundo-es', 'amazon-it', 'yandex-com', 'theverge-com', 'clarin-com', 'about-com',
      'yadi-sk', 'sciencedaily-com', 'insider-com', 'airbnb-com', 'google-ca', 'sputniknews-com', 'reg-ru', 'zdnet-com', 'ietf-org', 'corriere-it',
      'thestar-com', 'onamae-com', 'pornhub-com', 'barnesandnoble-com', 'slate-com', 'strato-hosting-eu', 'over-blog-com', 'onelink-me', 'orange-fr', 'google-co-id',
      '123rf-com', 'natro-com', 'thehill-com', 'focus-de', 'kompas-com', 'bfmtv-com', 'getbootstrap-com', 'wallpapers-com', 'mailchi-mp', 'scholar-google-com',
      'e-monsite-com', 'bp1-blogger-com', 'pnas-org', 'weforum-org', 'substack-com', 'dell-com', 'usgs-gov', 'house-gov', 'xbox-com', 'openai-com',
      'oecd-org', 'worldbank-org', 'thefreedictionary-com', 'amazon-ca', 'giphy-com', 'politico-com', 'xinhuanet-com', 'm-me', 'ebay-co-uk', 'bild-de',
      'ndtv-com', 'udemy-com', 'fifa-com', 'hoax-com', 'greenpeace-org', 'scholastic-com', 'prtimes-jp', 'washington-edu', 'search-google-com', 'hilton-com',
      'target-com', 'asus-com', 'legifrance-gouv-fr', 'ca-gov', 'itch-io', 'dribbble-com', 'merriam-webster-com', 'sfgate-com', 'fortune-com', 'automattic-com',
      'canada-ca', 'rollingstone-com', 'newyorker-com', 'nymag-com', 'pcmag-com', 'thedailybeast-com', 'history-com', 'xing-com', 'ox-ac-uk', 'mdpi-com',
      'public-api-wordpress-com', 'ameblo-jp', 'geocities-com', 'vice-com', 'answers-com', 'utexas-edu', 'fbsbx-com', 'usda-gov', 'vox-com', 'lycos-com',
      'impress-co-jp', 'frontiersin-org', 'asahi-com', 'businesswire-com', 'nfl-com', 'cbslocal-com', 'cisco-com', 'alibaba-com', 'aliyun-com', 'taobao-com',
      'jd-com', 'baidu-com', 'sina-com-cn', 'sohu-com', '163-com', 'qq-com', 'tmall-com',
      'bilibili-com', 'iqiyi-com', 'youku-com', 'douyin-com', 'kuaishou-com', 'xiaohongshu-com', 'zhihu-com', 'weibo-com', 'meituan-com', 'ele-me',
      'dianping-com', 'pinduoduo-com', 'vip-com', 'ctrip-com', 'qunar-com', 'fliggy-com', 'mafengwo-net', 'douban-com', 'huya-com', 'douyu-com',
      'yy-com', 'afreecatv-com', 'nonolive-com', 'bigolive-tv', '17live-com', 'mico-live', 'tango-me', 'liveme-com', 'bigo-sg', 'bigo-tv', 'bigo-live',
      'joyy-sg', 'bilibili-tv', 'bilibili-in', 'bilibili-th', 'bilibili-id', 'bilibili-vn', 'bilibili-ph', 'bilibili-my', 'bilibili-sg', 'bilibili-hk',
      'bilibili-tw', 'bilibili-cn', 'bilibili-us', 'bilibili-eu', 'bilibili-jp', 'bilibili-kr', 'bilibili-au', 'bilibili-ca', 'bilibili-br', 'bilibili-mx',
      'bilibili-ar', 'bilibili-tr', 'bilibili-ru', 'bilibili-in', 'bilibili-de', 'bilibili-fr', 'bilibili-es', 'bilibili-it', 'bilibili-pl', 'bilibili-nl',
      'bilibili-be', 'bilibili-se', 'bilibili-no', 'bilibili-dk', 'bilibili-fi', 'bilibili-ch', 'bilibili-at', 'bilibili-pt', 'bilibili-ie', 'bilibili-gr',
      'bilibili-pl', 'bilibili-cz', 'bilibili-hu', 'bilibili-ro', 'bilibili-bg', 'bilibili-rs', 'bilibili-hr', 'bilibili-sk', 'bilibili-si', 'bilibili-lt',
      'bilibili-lv', 'bilibili-ee', 'bilibili-ua', 'bilibili-ru', 'bilibili-kz', 'bilibili-by', 'bilibili-uz', 'bilibili-az', 'bilibili-ge', 'bilibili-am',
      'bilibili-md', 'bilibili-kg', 'bilibili-tj', 'bilibili-tm', 'bilibili-mn'
      // → Add 500–1000 more here from top lists (social, adult, regional, etc.)
      // For now this is ~100; expand gradually to avoid build time spikes
    ];
    const uniqueSites = [...new Set(popularSites)];

    return popularSites.map(site => ({
      loc: `${config.siteUrl}/status/${site}`,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};