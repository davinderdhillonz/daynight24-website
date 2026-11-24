(function(){
  "use strict";

  /* ============================================================================
     DAYNIGHT24 BOOKING & PRICING ESTIMATORS
     Edit prices, labels, or options directly in the data objects below.
     ============================================================================ */

  var PHONE_DISPLAY = "780-399-9609";
  var PHONE_HREF    = "tel:+17803999609";
  var EMAIL_ADDR    = "info@daynight24.ca";
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/info@daynight24.ca";

  var APPLIANCE_CATEGORIES = [
    {
      slug: "dishwasher",
      title: "Dishwasher Installation",
      items: [
        { id: "dw-main", title: "Dishwasher Installation", price: 180, main: true },
        { id: "dw-inlet", title: "Water Inlet Hose — 6 Feet Steel Braided", price: 30, main: false },
        { id: "dw-drain", title: "Drain Hose — 6 Feet", note: "Needed only if dishwasher is 1 or more cabinets away from sink", price: 30, main: false },
        { id: "dw-haul", title: "Old Dishwasher Recycle / Haul Away", price: 40, main: false },
        { id: "dw-bosch-plug", title: "Addition of Electrical Plug / Outlet", note: "For Bosch dishwasher only", price: 60, main: false },
        { id: "dw-old-water", title: "Modification for Water Inlet Hose Connection", note: "Mostly for older homes", price: 60, main: false },
        { id: "dw-pickup", title: "Dishwasher or Small Appliance Store Pick Up & Home Delivery", price: 80, main: false },
        { id: "dw-extra-cab", title: "Dishwasher Away More Than One Cabinet From Sink", note: "Extra $40 per cabinet distance", price: 40, main: false }
      ]
    },
    {
      slug: "otr-microwave",
      title: "Over the Range (OTR) Microwave Install",
      items: [
        { id: "otr-main", title: "Over the Range (OTR) Microwave Install", price: 180, main: true },
        { id: "otr-plug", title: "Addition of Electrical Plug", price: 60, main: false },
        { id: "otr-haul", title: "Old OTR Microwave Recycle / Haul Away", price: 40, main: false },
        { id: "otr-duct", title: "Exhaust Duct Installation", price: 60, main: false },
        { id: "otr-cut", title: "Cabinet Cutout for First-Time Install", price: 40, main: false }
      ]
    },
    {
      slug: "under-cabinet-hood",
      title: "Under Cabinet Range Hood (30 to 36 inch)",
      items: [
        { id: "uch-main", title: "Under Cabinet Range Hood Install (30 to 36 inch)", price: 140, main: true },
        { id: "uch-duct", title: "Exhaust Duct Installation", price: 60, main: false },
        { id: "uch-haul", title: "Old Hood Haul Away", price: 25, main: false },
        { id: "uch-outlet", title: "Electrical Outlet", price: 40, main: false }
      ]
    },
    {
      slug: "chimney-hood",
      title: "Chimney Style Range Hood Install (30 to 36 inch wide)",
      items: [
        { id: "ch-main", title: "Chimney Style Range Hood Install (30 to 36 inch wide)", price: 220, main: true },
        { id: "ch-duct", title: "Exhaust Duct Installation", price: 60, main: false }
      ]
    },
    {
      slug: "gas-range",
      title: "Gas Range Install",
      items: [
        { id: "gr-main", title: "Gas Range Installation + Uninstallation", price: 180, main: true },
        { id: "gr-hose", title: "Gas Hose — 3 Feet", price: 50, main: false },
        { id: "gr-uninst", title: "Special Trip for Gas Range Uninstallation", price: 80, main: false }
      ]
    },
    {
      slug: "gas-cooktop",
      title: "Gas Cook Top Install (30 or 36 inch)",
      items: [
        { id: "gct-main", title: "Gas Cook Top Install + Uninstall (30 or 36 inch)", price: 180, main: true },
        { id: "gct-hose", title: "Gas Hose — 3 Feet", price: 50, main: false },
        { id: "gct-uninst", title: "Special Trip for Gas Cook Top Uninstallation", price: 80, main: false }
      ]
    },
    {
      slug: "electric-cooktop",
      title: "Electric Cook Top Install",
      items: [
        { id: "ect-main", title: "Electric Cook Top Install", price: 180, main: true }
      ]
    },
    {
      slug: "built-in-microwave",
      title: "Built-In Microwave",
      items: [
        { id: "bm-main", title: "Built-In Microwave Install", price: 150, main: true }
      ]
    },
    {
      slug: "built-in-wall-oven",
      title: "Built-In Wall Oven",
      items: [
        { id: "bwo-single", title: "Built-In Single Wall Oven Install", price: 180, main: true },
        { id: "bwo-double", title: "Built-In Double Wall Oven Install", price: 220, main: true }
      ]
    },
    {
      slug: "washer-dryer",
      title: "Electric Washer & Dryer",
      items: [
        { id: "wd-side", title: "Electric Washer & Dryer Installation (Side by Side)", price: 150, main: true },
        { id: "wd-stack", title: "Electric Washer & Dryer Stackable Install", price: 220, main: true },
        { id: "wd-kit", title: "Stacking Kit", price: 120, main: false },
        { id: "wd-vent", title: "Dryer Vent Duct", price: 20, main: false },
        { id: "wd-washer-line", title: "Washer Water Supply Line", price: 40, main: false },
        { id: "wd-dryer-line", title: "Dryer Supply Line", price: 30, main: false }
      ]
    },
    {
      slug: "fridge-water-line",
      title: "Existing Fridge Water Line Install",
      items: [
        { id: "fwl-main", title: "Existing Fridge Water Line Install", price: 80, main: true },
        { id: "fwl-hose", title: "Fridge Water Line Hose", price: 30, main: false }
      ]
    },
    {
      slug: "built-in-fridge",
      title: "Built-In Fridge & Freezer Install with Trim Kit",
      items: [
        { id: "bif-wp", title: "Built-In Fridge & Freezer Install with Trim Kit (Whirlpool)", price: 200, main: true },
        { id: "bif-ka", title: "Built-In Refrigerator Install Side by Side (KitchenAid)", price: 180, main: true },
        { id: "bif-fg", title: "Built-In Fridge & Freezer Install with Trim Kit (Frigidaire)", price: 300, main: true }
      ]
    }
  ];

  var TV_MOUNTING_CONFIG = {
    formName: "TV Wall Mounting Booking",
    includeGst: false,
    groups: [
      {
        id: "tvSize",
        title: "1. What's the TV size?",
        icon: "bi-tv-fill",
        type: "radio",
        required: true,
        options: [
          { id: "tv-32-60", label: '32 – 60" TV Installation', sub: "Standard living room & bedroom screens", price: 89.99, art: "tv-sm" },
          { id: "tv-61-79", label: '61 – 79" TV Installation', sub: "Large format — two-person safe handling", price: 99.99, art: "tv-md" },
          { id: "tv-80-plus", label: '80"+ TV Installation', sub: "Oversized home theater screens", price: 129.99, art: "tv-lg" }
        ]
      },
      {
        id: "wallMount",
        title: "2. What type of TV wall mount / bracket do you need?",
        icon: "bi-aspect-ratio-fill",
        type: "radio",
        required: true,
        options: [
          { id: "mount-fixed-75", label: 'Fixed & Tilt Wall Mount (Up to 75")', sub: "Low-profile tilt bracket supplied", price: 45, art: "mount-tilt" },
          { id: "mount-fixed-100", label: 'Fixed & Tilt Wall Mount (Up to 100")', sub: "Heavy-duty XL tilt bracket supplied", price: 90, art: "mount-tilt" },
          { id: "mount-full-70", label: 'Full Motion Wall Mount (Up to 70")', sub: "Swivel, extend & angle adjustment", price: 70, art: "mount-motion" },
          { id: "mount-full-90", label: 'Full Motion Wall Mount (Up to 90")', sub: "Heavy-duty articulating arm supplied", price: 120, art: "mount-motion" },
          { id: "mount-own", label: "I Already Have My Own Mount", sub: "Bring your existing bracket", price: 0, priceLabel: "$0.00", art: "mount-own" }
        ]
      },
      {
        id: "surfaceType",
        title: "3. What type of surface will your TV be mounted on?",
        icon: "bi-bricks",
        type: "radio",
        required: true,
        options: [
          { id: "surf-drywall", label: "Drywall / Painted Wall", sub: "Standard wood or metal studs", price: 0, priceLabel: "+$0.00" },
          { id: "surf-tile", label: "Tile / Brick", sub: "Precision masonry drilling", price: 40, priceLabel: "+$40.00" },
          { id: "surf-stone", label: "Stone Surface", sub: "Fireplace & natural stone surround", price: 60, priceLabel: "+$60.00" },
          { id: "surf-concrete", label: "Concrete (Confirm by Call)", sub: "We'll confirm anchor specs by phone", price: 0, priceLabel: "Contact" },
          { id: "surf-unknown", label: "I Don't Know", sub: "We inspect on site before drilling", price: 0, priceLabel: "+$0.00" }
        ]
      },
      {
        id: "addons",
        title: "4. Would you like to add any products or services?",
        icon: "bi-plus-circle-fill",
        type: "checkbox",
        required: false,
        options: [
          { id: "addon-soundbar", label: "Sound Bar Installation (Including Sound Bar Mount)", sub: "Mounted level beneath or above TV", price: 70, priceLabel: "+$70.00" },
          { id: "addon-other", label: "Any Other Service (Call " + PHONE_DISPLAY + ")", sub: "Custom wire concealment, shelves, or multi-TV setup", price: 0, priceLabel: "Custom" }
        ]
      }
    ]
  };

  var AUTO_DETAILING_CONFIG = {
    formName: "Mobile Auto Detailing Booking",
    includeGst: true,
    groups: [
      {
        id: "vehicleSize",
        title: "1. Choose your vehicle size",
        icon: "bi-car-front-fill",
        type: "radio",
        required: true,
        options: [
          { id: "veh-sedan", label: "Sedan / Coupe / Compact", sub: "2-door or 4-door standard car", price: 0, priceLabel: "Base rate", art: "car-sm" },
          { id: "veh-suv", label: "Mid-Size SUV / Crossover", sub: "2-row SUV or station wagon", price: 20, priceLabel: "+$20.00", art: "car-md" },
          { id: "veh-truck", label: "Truck / Minivan / 3-Row SUV", sub: "Full-size pickup or 7-passenger", price: 40, priceLabel: "+$40.00", art: "car-lg" }
        ]
      },
      {
        id: "detailPkg",
        title: "2. Select your detailing package",
        icon: "bi-stars",
        type: "radio",
        required: true,
        options: [
          { id: "pkg-interior", label: "Interior Deep Clean", sub: "Full vacuum, steam/shampoo carpets & seats, leather & dash conditioning, interior glass", price: 149 },
          { id: "pkg-exterior", label: "Exterior Wash, Decontaminate & Wax", sub: "Foam bath, clay bar treatment, wheel & tire dressing, protective wax coat", price: 119 },
          { id: "pkg-full", label: "Complete Inside & Out Detail", sub: "Full interior deep clean plus exterior wash, clay bar & wax protection", price: 239 }
        ]
      },
      {
        id: "detailAddons",
        title: "3. Optional add-on treatments",
        icon: "bi-plus-circle-fill",
        type: "checkbox",
        required: false,
        options: [
          { id: "add-pet", label: "Heavy Pet Hair Removal", sub: "Deep extraction from seats & trunk", price: 40, priceLabel: "+$40.00" },
          { id: "add-engine", label: "Engine Bay Degrease & Dress", sub: "Safe low-pressure clean & satin finish", price: 45, priceLabel: "+$45.00" },
          { id: "add-headlights", label: "Headlight Restoration (Pair)", sub: "Wet sand, polish & UV seal", price: 60, priceLabel: "+$60.00" },
          { id: "add-ceramic", label: "6-Month Ceramic Paint Sealant", sub: "Hydrophobic gloss upgrade over wax", price: 70, priceLabel: "+$70.00" }
        ]
      }
    ]
  };

  var TIME_SLOTS = ["9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
  var HEAR_SOURCES = ["Google","Kijiji","Bark","Factory Direct","Word Of Mouth","Facebook Ad","Facebook Marketplace","Yelp","Instagram","Blog","Other"];

  /* ============================================================================
     SHARED HELPERS
     ============================================================================ */

  function money(n){
    return "$" + Number(n || 0).toFixed(2);
  }

  function esc(str){
    return String(str == null ? "" : str)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  function showModal(title, message){
    var backdrop = document.getElementById("customModal");
    if(!backdrop){ alert(title + "\n\n" + message); return; }
    backdrop.querySelector("[data-modal-title]").textContent = title;
    backdrop.querySelector("[data-modal-msg]").textContent = message;
    backdrop.classList.add("is-open");
    var okBtn = backdrop.querySelector("[data-modal-close]");
    if(okBtn) okBtn.focus();
  }

  function bindModal(){
    var backdrop = document.getElementById("customModal");
    if(!backdrop) return;
    backdrop.addEventListener("click", function(e){
      if(e.target === backdrop || e.target.closest("[data-modal-close]")){
        backdrop.classList.remove("is-open");
      }
    });
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape" && backdrop.classList.contains("is-open")){
        backdrop.classList.remove("is-open");
      }
    });
  }

  function cardArtwork(art){
    if(!art) return "";
    var svgs = {
      "tv-sm": '<svg viewBox="0 0 80 48" fill="none" aria-hidden="true"><rect x="18" y="8" width="44" height="28" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M33 41h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
      "tv-md": '<svg viewBox="0 0 80 48" fill="none" aria-hidden="true"><rect x="11" y="6" width="58" height="32" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M31 42h18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
      "tv-lg": '<svg viewBox="0 0 80 48" fill="none" aria-hidden="true"><rect x="5" y="4" width="70" height="36" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M29 44h22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
      "mount-tilt": '<svg viewBox="0 0 80 48" fill="none" aria-hidden="true"><rect x="16" y="10" width="48" height="28" rx="3" stroke="currentColor" stroke-width="2.2"/><path d="M28 16v16M52 16v16M22 24h36" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
      "mount-motion": '<svg viewBox="0 0 80 48" fill="none" aria-hidden="true"><path d="M12 14v20M12 24h16l10-8h26v16H38l-10-8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      "mount-own": '<svg viewBox="0 0 80 48" fill="none" aria-hidden="true"><rect x="20" y="10" width="40" height="28" rx="4" stroke="currentColor" stroke-width="2.2" stroke-dasharray="4 3"/><path d="M33 24l5 5 10-10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      "car-sm": '<svg viewBox="0 0 80 48" fill="none" aria-hidden="true"><path d="M14 30l6-11h32l8 11h6v7H12v-7h2z" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"/><circle cx="24" cy="37" r="4" fill="currentColor"/><circle cx="56" cy="37" r="4" fill="currentColor"/></svg>',
      "car-md": '<svg viewBox="0 0 80 48" fill="none" aria-hidden="true"><path d="M12 29l5-13h36l9 13h6v8H10v-8h2z" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"/><circle cx="23" cy="37" r="4.5" fill="currentColor"/><circle cx="57" cy="37" r="4.5" fill="currentColor"/></svg>',
      "car-lg": '<svg viewBox="0 0 80 48" fill="none" aria-hidden="true"><path d="M8 29V15h34v14h24v8H8v-8z" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"/><circle cx="21" cy="37" r="4.5" fill="currentColor"/><circle cx="57" cy="37" r="4.5" fill="currentColor"/></svg>'
    };
    return svgs[art] ? '<div class="ccard-art">' + svgs[art] + '</div>' : "";
  }

  function formatDateISO(d){
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function formatDateHuman(iso){
    var parts = iso.split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString("en-CA", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
  }

  function renderCalendar(container, state, onChange){
    var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var today  = new Date(); today.setHours(0,0,0,0);
    var viewYear  = state.viewYear;
    var viewMonth = state.viewMonth;

    function draw(){
      var firstDay = new Date(viewYear, viewMonth, 1).getDay();
      var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      var html = '<div class="cal-head">' +
        '<span class="cal-title">' + MONTHS[viewMonth] + ' ' + viewYear + '</span>' +
        '<div class="cal-nav">' +
          '<button type="button" data-cal-prev aria-label="Previous month"><i class="bi bi-chevron-left"></i></button>' +
          '<button type="button" data-cal-next aria-label="Next month"><i class="bi bi-chevron-right"></i></button>' +
        '</div></div>' +
        '<div class="cal-wk">' + DAYS.map(function(d){ return "<span>" + d + "</span>"; }).join("") + '</div>' +
        '<div class="cal-days">';
      for(var i = 0; i < firstDay; i++){ html += '<span></span>'; }
      for(var day = 1; day <= daysInMonth; day++){
        var dObj = new Date(viewYear, viewMonth, day);
        var iso = formatDateISO(dObj);
        var isPast = dObj < today;
        var cls = "cal-day" + (iso === formatDateISO(today) ? " is-today" : "") + (iso === state.selectedDate ? " is-selected" : "");
        html += '<button type="button" class="' + cls + '" data-cal-date="' + iso + '"' + (isPast ? " disabled" : "") + '>' + day + '</button>';
      }
      html += '</div><div class="cal-picked"><i class="bi bi-calendar-check-fill"></i> Selected date: <strong>' + esc(formatDateHuman(state.selectedDate)) + '</strong></div>';
      container.innerHTML = html;
    }

    container.addEventListener("click", function(e){
      if(e.target.closest("[data-cal-prev]")){
        viewMonth--;
        if(viewMonth < 0){ viewMonth = 11; viewYear--; }
        draw();
      } else if(e.target.closest("[data-cal-next]")){
        viewMonth++;
        if(viewMonth > 11){ viewMonth = 0; viewYear++; }
        draw();
      } else {
        var dayBtn = e.target.closest("[data-cal-date]");
        if(dayBtn && !dayBtn.disabled){
          state.selectedDate = dayBtn.getAttribute("data-cal-date");
          draw();
          if(onChange) onChange(state.selectedDate);
        }
      }
    });
    draw();
  }

  function submitBooking(formTitle, payload, targetEl){
    var ref = "DN24-" + Math.floor(100000 + Math.random() * 900000);
    var summaryText = payload.items.map(function(i){ return "- " + i.label + " (" + money(i.price) + ")"; }).join("\n");
    var bodyText =
      formTitle + " (" + ref + ")\n\n" +
      "Customer: " + payload.name + "\n" +
      "Phone: " + payload.phone + "\n" +
      "Email: " + payload.email + "\n" +
      "Address: " + payload.address + "\n" +
      "Preferred Date: " + payload.date + (payload.time ? " at " + payload.time : "") + "\n" +
      (payload.source ? "Heard About Us: " + payload.source + "\n" : "") +
      (payload.notes ? "Notes: " + payload.notes + "\n" : "") +
      "\nSelected Services:\n" + summaryText + "\n\n" +
      (payload.gst != null ? "Subtotal: " + money(payload.subtotal) + "\nGST (5%): " + money(payload.gst) + "\n" : "") +
      "Total Estimate: " + money(payload.total);

    var mailto = "mailto:" + EMAIL_ADDR +
      "?subject=" + encodeURIComponent(formTitle + " [" + ref + "] — " + payload.name) +
      "&body=" + encodeURIComponent(bodyText);

    function renderConfirmation(sentOnline){
      targetEl.innerHTML =
        '<div class="booking-confirm">' +
          '<h3><i class="bi bi-patch-check-fill"></i> ' + (sentOnline ? "Booking Request Sent" : "Estimate Ready to Confirm") + '</h3>' +
          '<p>Reference: <strong>' + esc(ref) + '</strong></p>' +
          '<p>' + (sentOnline
            ? "Thank you, " + esc(payload.name) + ". Your itemized booking request has been emailed to <strong>" + EMAIL_ADDR + "</strong> and our Edmonton team will confirm shortly."
            : "Your itemized estimate for <strong>" + money(payload.total) + "</strong> is ready. Send it directly to <strong>" + EMAIL_ADDR + "</strong> below or call us 24/7 to lock in your arrival window.") + '</p>' +
          '<div class="review-sec" style="margin:18px 0">' +
            '<h4>Summary</h4>' +
            '<p style="margin-bottom:8px"><strong>Date:</strong> ' + esc(payload.date) + (payload.time ? " at " + esc(payload.time) : "") + '<br>' +
            '<strong>Address:</strong> ' + esc(payload.address) + '</p>' +
            '<ul class="check-list">' + payload.items.map(function(i){ return '<li><i class="bi bi-check-circle-fill"></i> ' + esc(i.label) + ' — <strong>' + money(i.price) + '</strong></li>'; }).join("") + '</ul>' +
          '</div>' +
          '<div class="btn-row">' +
            (!sentOnline ? '<a class="btn btn--gold" href="' + mailto + '" target="_blank" rel="noopener"><i class="bi bi-envelope-fill"></i> Email Booking to ' + EMAIL_ADDR + '</a>' : '') +
            '<a class="btn btn--navy" href="' + PHONE_HREF + '"><i class="bi bi-telephone-fill"></i> Call ' + PHONE_DISPLAY + '</a>' +
          '</div>' +
        '</div>';
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if(FORM_ENDPOINT && FORM_ENDPOINT.indexOf("YOUR_FORM_ID") === -1){
      var fd = new FormData();
      fd.append("_subject", formTitle + " [" + ref + "] — " + payload.name);
      fd.append("_replyto", payload.email);
      fd.append("_template", "table");
      fd.append("_captcha", "false");
      fd.append("reference", ref);
      fd.append("service_type", formTitle);
      fd.append("name", payload.name);
      fd.append("phone", payload.phone);
      fd.append("email", payload.email);
      fd.append("address", payload.address);
      fd.append("date", payload.date);
      if(payload.time) fd.append("time", payload.time);
      if(payload.source) fd.append("source", payload.source);
      if(payload.notes) fd.append("notes", payload.notes);
      fd.append("estimate_total", money(payload.total));
      fd.append("summary", bodyText);
      fetch(FORM_ENDPOINT, { method: "POST", body: fd, headers: { "Accept": "application/json" } })
        .then(function(res){
          return res.json().catch(function(){ return {}; }).then(function(data){
            var ok = res.ok && (data.success === undefined || data.success === true || data.success === "true");
            renderConfirmation(ok);
          });
        })
        .catch(function(){ renderConfirmation(false); });
    } else {
      renderConfirmation(false);
    }
  }

  /* ============================================================================
     1. APPLIANCE INSTALLATION 3-STEP ESTIMATOR
     ============================================================================ */

  function initApplianceEstimator(root){
    var params = new URLSearchParams(window.location.search);
    var catParam = params.get("cat");
    var initialCat = catParam || "dishwasher";
    var today = new Date();
    var selectedIds = {};
    var currentStep = 1;
    var calState = {
      viewYear: today.getFullYear(),
      viewMonth: today.getMonth(),
      selectedDate: formatDateISO(today)
    };

    var itemLookup = {};
    APPLIANCE_CATEGORIES.forEach(function(cat){
      cat.items.forEach(function(item){
        itemLookup[item.id] = { item: item, cat: cat.title, slug: cat.slug };
      });
    });

    var accContainer = root.querySelector("#appAccordion");
    accContainer.innerHTML = APPLIANCE_CATEGORIES.map(function(cat, idx){
      var isOpen = cat.slug === initialCat || (idx === 0 && !APPLIANCE_CATEGORIES.some(function(c){ return c.slug === initialCat; }));
      return '<div class="acc-cat' + (isOpen ? " is-open" : "") + '" data-cat-slug="' + esc(cat.slug) + '">' +
        '<button type="button" class="acc-head" aria-expanded="' + (isOpen ? "true" : "false") + '">' +
          '<span class="acc-num">' + String(idx + 1).padStart(2,"0") + '</span>' +
          '<span>' + esc(cat.title) + '</span>' +
          '<span class="acc-badge" data-cat-badge="' + esc(cat.slug) + '"></span>' +
          '<span class="acc-count">' + cat.items.length + (cat.items.length === 1 ? " option" : " options") + '</span>' +
          '<i class="bi bi-chevron-down acc-caret"></i>' +
        '</button>' +
        '<div class="acc-body"><div class="opt-list">' +
          cat.items.map(function(opt){
            return '<label class="opt-row" data-opt-id="' + esc(opt.id) + '">' +
              '<input type="checkbox" class="app-opt-check" value="' + esc(opt.id) + '" data-main="' + (opt.main ? "Y" : "N") + '">' +
              '<span class="opt-info">' +
                '<span class="opt-title">' + esc(opt.title) + '</span>' +
                (opt.main ? '<span class="opt-main-tag">Main Installation</span>' : '') +
                (opt.note ? '<span class="opt-subnote">' + esc(opt.note) + '</span>' : '') +
              '</span>' +
              '<span class="opt-price">' + money(opt.price) + '</span>' +
            '</label>';
          }).join("") +
        '</div></div></div>';
    }).join("");

    var calBox = root.querySelector("#appCalendar");
    renderCalendar(calBox, calState);

    function getSelected(){
      return Object.keys(selectedIds).filter(function(id){ return selectedIds[id]; }).map(function(id){ return itemLookup[id]; });
    }

    function updateSummary(){
      var chosen = getSelected();
      var subtotal = chosen.reduce(function(acc, entry){ return acc + entry.item.price; }, 0);
      var gst = subtotal * 0.05;
      var total = subtotal + gst;

      var emptyEl = root.querySelector("#sumEmpty");
      var listEl  = root.querySelector("#sumList");
      if(chosen.length === 0){
        emptyEl.style.display = "block";
        listEl.innerHTML = "";
      } else {
        emptyEl.style.display = "none";
        listEl.innerHTML = chosen.map(function(entry){
          return '<div class="sum-item">' +
            '<div class="sum-item-name"><span class="sum-item-cat">' + esc(entry.cat) + '</span>' + esc(entry.item.title) + '</div>' +
            '<div class="sum-item-price">' + money(entry.item.price) + '</div>' +
          '</div>';
        }).join("");
      }

      root.querySelector("#sumSub").textContent = money(subtotal);
      root.querySelector("#sumGst").textContent = money(gst);
      root.querySelector("#sumTotal").textContent = money(total);

      // Update per-category badges
      APPLIANCE_CATEGORIES.forEach(function(cat){
        var count = cat.items.filter(function(opt){ return selectedIds[opt.id]; }).length;
        var badge = root.querySelector('[data-cat-badge="' + cat.slug + '"]');
        if(badge){
          badge.textContent = count ? count + " selected" : "";
          badge.classList.toggle("has-items", count > 0);
        }
      });

      // Sticky bottom cart bar
      var cartBar = document.getElementById("estCartBar");
      if(cartBar){
        cartBar.classList.toggle("is-visible", chosen.length > 0 && currentStep === 1);
        cartBar.querySelector("[data-cart-count]").textContent = chosen.length + (chosen.length === 1 ? " service selected" : " services selected");
        cartBar.querySelector("[data-cart-total]").textContent = money(total);
      }
    }

    function setStep(step){
      currentStep = step;
      root.querySelectorAll(".step-pane").forEach(function(pane){
        pane.classList.toggle("is-active", Number(pane.getAttribute("data-step")) === step);
      });
      root.querySelectorAll(".est-step").forEach(function(pill){
        var s = Number(pill.getAttribute("data-step-pill"));
        pill.classList.toggle("is-active", s === step);
        pill.classList.toggle("is-done", s < step);
      });
      updateSummary();
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    accContainer.addEventListener("click", function(e){
      var head = e.target.closest(".acc-head");
      if(!head) return;
      var catEl = head.closest(".acc-cat");
      var open = catEl.classList.toggle("is-open");
      head.setAttribute("aria-expanded", open ? "true" : "false");
    });

    accContainer.addEventListener("change", function(e){
      var cb = e.target;
      if(!cb.classList.contains("app-opt-check")) return;
      var id = cb.value;
      var isMain = cb.getAttribute("data-main") === "Y";
      if(cb.checked && !isMain){
        var hasMain = getSelected().some(function(entry){ return entry.item.main; });
        if(!hasMain){
          cb.checked = false;
          showModal("Main Installation Required", "Please select at least one Main Installation service before adding accessories, hoses, or haul-away add-ons.");
          return;
        }
      }
      selectedIds[id] = cb.checked;
      // Ensure at least one main stays selected if add-ons remain
      if(!cb.checked && isMain){
        var remaining = getSelected();
        var stillHasMain = remaining.some(function(entry){ return entry.item.main; });
        if(!stillHasMain && remaining.length > 0){
          remaining.forEach(function(entry){
            selectedIds[entry.item.id] = false;
            var box = accContainer.querySelector('input[value="' + entry.item.id + '"]');
            if(box){ box.checked = false; box.closest(".opt-row").classList.remove("is-checked"); }
          });
        }
      }
      cb.closest(".opt-row").classList.toggle("is-checked", cb.checked);
      updateSummary();
    });

    function goStep2(){
      if(getSelected().length === 0){
        showModal("Service Selection", "Please select at least one appliance installation service to continue.");
        return;
      }
      setStep(2);
    }

    root.querySelector("#appNext1").addEventListener("click", goStep2);
    root.querySelector("#sumNextBtn").addEventListener("click", function(){
      if(currentStep === 1) goStep2();
      else if(currentStep === 2) setStep(3);
      else root.querySelector('#appDetailsForm button[type="submit"]').click();
    });
    var cartNext = document.getElementById("cartNextBtn");
    if(cartNext) cartNext.addEventListener("click", goStep2);

    root.querySelector("#appPrev2").addEventListener("click", function(){ setStep(1); });
    root.querySelector("#appNext2").addEventListener("click", function(){ setStep(3); });
    root.querySelector("#appPrev3").addEventListener("click", function(){ setStep(2); });

    root.querySelector("#appDetailsForm").addEventListener("submit", function(e){
      e.preventDefault();
      var chosen = getSelected();
      if(chosen.length === 0){ setStep(1); return; }
      var subtotal = chosen.reduce(function(acc, entry){ return acc + entry.item.price; }, 0);
      var gst = subtotal * 0.05;
      submitBooking("Appliance Installation Booking", {
        name: root.querySelector("#appName").value.trim(),
        phone: root.querySelector("#appPhone").value.trim(),
        email: root.querySelector("#appEmail").value.trim(),
        address: root.querySelector("#appAddress").value.trim(),
        notes: root.querySelector("#appMessage").value.trim(),
        date: formatDateHuman(calState.selectedDate),
        subtotal: subtotal,
        gst: gst,
        total: subtotal + gst,
        items: chosen.map(function(entry){ return { label: entry.item.title, price: entry.item.price }; })
      }, root.querySelector("#appResult"));
    });

    updateSummary();
    if(catParam){
      var targetCat = accContainer.querySelector('[data-cat-slug="' + catParam + '"]');
      if(targetCat) setTimeout(function(){ targetCat.scrollIntoView({ behavior: "smooth", block: "center" }); }, 120);
    }
  }

  /* ============================================================================
     2. VISUAL CARD 3-STEP ESTIMATOR (TV WALL MOUNTING & MOBILE AUTO DETAILING)
     ============================================================================ */

  function initVisualEstimator(root, config){
    var currentStep = 1;
    var selections = {};
    var todayISO = formatDateISO(new Date());

    // Pre-select first option in required radio groups if desired, or keep clean choice
    var groupsBox = root.querySelector("#visGroups");
    groupsBox.innerHTML = config.groups.map(function(grp){
      return '<div class="choice-block">' +
        '<div class="choice-title"><i class="bi ' + esc(grp.icon) + '"></i> ' + esc(grp.title) + '</div>' +
        '<div class="card-choices' + (grp.options.some(function(o){ return !o.art; }) ? " card-choices--wide" : "") + '">' +
          grp.options.map(function(opt){
            var pLabel = opt.priceLabel || (opt.price ? money(opt.price) : "$0.00");
            return '<label class="ccard" data-group="' + esc(grp.id) + '" data-opt="' + esc(opt.id) + '">' +
              '<input type="' + esc(grp.type) + '" name="' + esc(grp.id) + (grp.type === "checkbox" ? "[]" : "") + '" value="' + esc(opt.id) + '">' +
              cardArtwork(opt.art) +
              '<span class="ccard-name">' + esc(opt.label) + '</span>' +
              (opt.sub ? '<span class="ccard-sub">' + esc(opt.sub) + '</span>' : '') +
              '<span class="ccard-price">' + esc(pLabel) + '</span>' +
            '</label>';
          }).join("") +
        '</div></div>';
    }).join("");

    var dateInput = root.querySelector("#visDate");
    if(dateInput){ dateInput.min = todayISO; dateInput.value = todayISO; }
    var timeSelect = root.querySelector("#visTime");
    if(timeSelect){
      timeSelect.innerHTML = TIME_SLOTS.map(function(t){ return '<option value="' + esc(t) + '">' + esc(t) + '</option>'; }).join("");
    }
    var srcSelect = root.querySelector("#visSource");
    if(srcSelect){
      srcSelect.innerHTML = HEAR_SOURCES.map(function(s){ return '<option value="' + esc(s) + '">' + esc(s) + '</option>'; }).join("");
    }

    function readSelected(){
      var items = [];
      config.groups.forEach(function(grp){
        grp.options.forEach(function(opt){
          var input = groupsBox.querySelector('input[value="' + opt.id + '"]');
          if(input && input.checked){
            items.push({ group: grp.title.replace(/^\d+\.\s*/,""), label: opt.label, price: opt.price || 0, priceLabel: opt.priceLabel });
          }
        });
      });
      return items;
    }

    function computeTotals(items){
      var subtotal = items.reduce(function(sum, i){ return sum + i.price; }, 0);
      var gst = config.includeGst ? subtotal * 0.05 : null;
      var total = config.includeGst ? subtotal + gst : subtotal;
      return { subtotal: subtotal, gst: gst, total: total };
    }

    function syncVisualCards(){
      groupsBox.querySelectorAll(".ccard").forEach(function(card){
        var inp = card.querySelector("input");
        card.classList.toggle("is-checked", inp.checked);
      });
    }

    function updateSummary(){
      syncVisualCards();
      var items = readSelected();
      var totals = computeTotals(items);

      var emptyEl = root.querySelector("#visSumEmpty");
      var listEl  = root.querySelector("#visSumList");
      if(items.length === 0){
        emptyEl.style.display = "block";
        listEl.innerHTML = "";
      } else {
        emptyEl.style.display = "none";
        listEl.innerHTML = items.map(function(i){
          return '<div class="sum-item">' +
            '<div class="sum-item-name"><span class="sum-item-cat">' + esc(i.group) + '</span>' + esc(i.label) + '</div>' +
            '<div class="sum-item-price">' + (i.price > 0 ? money(i.price) : esc(i.priceLabel || "$0.00")) + '</div>' +
          '</div>';
        }).join("");
      }
      var subRow = root.querySelector("#visSubRow");
      var gstRow = root.querySelector("#visGstRow");
      if(config.includeGst){
        subRow.style.display = "flex";
        gstRow.style.display = "flex";
        root.querySelector("#visSub").textContent = money(totals.subtotal);
        root.querySelector("#visGst").textContent = money(totals.gst);
      } else {
        subRow.style.display = "none";
        gstRow.style.display = "none";
      }
      root.querySelector("#visTotal").textContent = money(totals.total);

      var cartBar = document.getElementById("estCartBar");
      if(cartBar){
        cartBar.classList.toggle("is-visible", items.length > 0 && currentStep === 1);
        cartBar.querySelector("[data-cart-count]").textContent = items.length + (items.length === 1 ? " selection" : " selections");
        cartBar.querySelector("[data-cart-total]").textContent = money(totals.total);
      }
    }

    function setStep(step){
      currentStep = step;
      root.querySelectorAll(".step-pane").forEach(function(pane){
        pane.classList.toggle("is-active", Number(pane.getAttribute("data-step")) === step);
      });
      root.querySelectorAll(".est-step").forEach(function(pill){
        var s = Number(pill.getAttribute("data-step-pill"));
        pill.classList.toggle("is-active", s === step);
        pill.classList.toggle("is-done", s < step);
      });
      updateSummary();
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function validateStep1(){
      for(var i = 0; i < config.groups.length; i++){
        var grp = config.groups[i];
        if(!grp.required) continue;
        var checked = groupsBox.querySelector('input[name="' + grp.id + '"]:checked');
        if(!checked){
          showModal("Complete Your Selections", "Please choose an option for: " + grp.title.replace(/^\d+\.\s*/,""));
          return false;
        }
      }
      return true;
    }

    function populateReview(){
      var items = readSelected();
      var totals = computeTotals(items);
      var name = root.querySelector("#visName").value.trim();
      var email = root.querySelector("#visEmail").value.trim();
      var phone = root.querySelector("#visPhone").value.trim();
      var address = root.querySelector("#visAddress").value.trim();
      var date = root.querySelector("#visDate").value;
      var time = root.querySelector("#visTime").value;
      var source = root.querySelector("#visSource").value;

      root.querySelector("#visReviewBox").innerHTML =
        '<div class="review-sec">' +
          '<h4>Selected Services</h4>' +
          '<ul class="check-list">' + items.map(function(i){
            return '<li><i class="bi bi-check-circle-fill"></i> ' + esc(i.label) + ' — <strong>' + (i.price > 0 ? "+" + money(i.price) : esc(i.priceLabel || "$0.00")) + '</strong></li>';
          }).join("") + '</ul>' +
          '<p style="margin-top:14px;font-weight:800;font-size:1.05rem">Total Estimated Cost: <span style="font-family:var(--font-mono)">' + money(totals.total) + '</span>' + (config.includeGst ? ' (incl. 5% GST)' : '') + '</p>' +
        '</div>' +
        '<div class="review-sec">' +
          '<h4>Customer Details</h4>' +
          '<div class="review-kv">' +
            '<div><strong>Name</strong>' + esc(name) + '</div>' +
            '<div><strong>Phone</strong>' + esc(phone) + '</div>' +
            '<div><strong>Email</strong>' + esc(email) + '</div>' +
            '<div><strong>Address</strong>' + esc(address) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="review-sec">' +
          '<h4>Preferred Schedule</h4>' +
          '<div class="review-kv">' +
            '<div><strong>Date</strong>' + esc(formatDateHuman(date)) + '</div>' +
            '<div><strong>Arrival Window</strong>' + esc(time) + '</div>' +
            '<div><strong>Referral Source</strong>' + esc(source) + '</div>' +
          '</div>' +
        '</div>';
    }

    groupsBox.addEventListener("change", updateSummary);

    function goStep2(){
      if(!validateStep1()) return;
      setStep(2);
    }

    root.querySelector("#visNext1").addEventListener("click", goStep2);
    var cartNext = document.getElementById("cartNextBtn");
    if(cartNext) cartNext.addEventListener("click", goStep2);

    root.querySelector("#visSumBtn").addEventListener("click", function(){
      if(currentStep === 1) goStep2();
      else if(currentStep === 2) root.querySelector('#visDetailsForm button[type="submit"]').click();
      else root.querySelector("#visConfirmBtn").click();
    });

    root.querySelector("#visBack2").addEventListener("click", function(){ setStep(1); });
    root.querySelector("#visDetailsForm").addEventListener("submit", function(e){
      e.preventDefault();
      populateReview();
      setStep(3);
    });
    root.querySelector("#visBack3").addEventListener("click", function(){ setStep(2); });
    root.querySelector("#visConfirmBtn").addEventListener("click", function(){
      var items = readSelected();
      var totals = computeTotals(items);
      submitBooking(config.formName, {
        name: root.querySelector("#visName").value.trim(),
        phone: root.querySelector("#visPhone").value.trim(),
        email: root.querySelector("#visEmail").value.trim(),
        address: root.querySelector("#visAddress").value.trim(),
        date: formatDateHuman(root.querySelector("#visDate").value),
        time: root.querySelector("#visTime").value,
        source: root.querySelector("#visSource").value,
        subtotal: totals.subtotal,
        gst: totals.gst,
        total: totals.total,
        items: items.map(function(i){ return { label: i.label, price: i.price }; })
      }, root.querySelector("#visResult"));
    });

    updateSummary();
  }

  /* ============================================================================
     BOOT
     ============================================================================ */

  bindModal();

  var appEl = document.getElementById("applianceEstimator");
  if(appEl) initApplianceEstimator(appEl);

  var tvEl = document.getElementById("tvEstimator");
  if(tvEl) initVisualEstimator(tvEl, TV_MOUNTING_CONFIG);

  var detEl = document.getElementById("detailingEstimator");
  if(detEl) initVisualEstimator(detEl, AUTO_DETAILING_CONFIG);
})();
