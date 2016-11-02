// This code is intended to be copied and pasted into a Web browser's
// JavaScript console, and run when one is on a NationStates issue results
// page, whereupon (assuming one has enabled "Show more stats") this code
// should generate a list of the issue's statistical effects in a format
// appropriate to copy and paste into the main YAML "database" of issue
// effects.

fetch('https://code.jquery.com/jquery-3.1.0.min.js')
   .then(r => r.text())
   .then(t => eval(t))
   .then(() =>
      $('.wceffects')
      .children()
      .children('.wc1')
      .map((_, e) => `- ${
         e.firstChild.textContent.replace(/:/, '')
      }: ${
         (([m, old, now]) => `${m} / ${
            (chg => `${chg > 0 ? '+' : ''}${chg}`)
            (Math.round(
               ((+now.replace(/,/, '')) - (+old.replace(/,/, '')))
               * 100) / 100)
         }`)
         (e.lastChild.firstChild.textContent.match(/([\d.,-]+) → ([\d.,-]+)/))
      } / ${
         (e => `${
            e.hasClass('wcg') ? '+' : (e.hasClass('wcr') ? '-' : '?')
         }${
            e.text()
         }`)
         ($(e.lastChild.lastChild))
      }`)
      .toArray()
      .join('\n')
   )
   .then(console.log)

// Vim: expandtab shiftwidth=3
