const london = [
  {
    id: 0,
    geometry: {
      location: {
        lat: 51.5054188,
        lng: -0.1259695,
      },
    },
    name: 'Old War Office Building',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwKPjo2zSYghR8oZW_Z5xuLQTuPBBFdRCzIY3r8bKRwbE87UL41NIsn_R9RfqZnflNB5-aPepsG-MdCzJp7hds65FGRuyjdx6Dve76nSlDfZwW2VDv41YP2CjoA7cq2ZGJwnATykwnIWZ97nhdKeXe8VzAZDDLcn4F4vSYazXbA7hH0&3u5152&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=13095',
  },
  {
    id: 1,
    geometry: {
      location: {
        lat: 51.5128536,
        lng: -0.1203715,
      },
    },
    name: 'Theatre Royal Drury Lane',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwKZoz6W39eJOOgNWmZ4lS7hNwS4SjtmpPHOwMbYV66B6TJwxAJXNWsJlUWwQeaXCqsZtHv1_533RXLYNHfHBlmCiwT4wWpoUpmZR6M4XbJrqK_JYIgQCf1fSOUksSHHvwOahwMl2AniX2uFJCPhew8XtnoZpNYyQnnP11NtJTEJ1FSL&3u6000&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=51321',
  },
  {
    id: 2,
    geometry: {
      location: {
        lat: 51.51118719999999,
        lng: -0.09223680000000001,
      },
    },
    name: 'St Michael Paternoster Royal',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJkMy-SIpnPC6Dqqsf9YyWL4SdMuQnLg7gT-L5bR93O4wXDz0z9SS9XG-vY9r1PyrUBf3zNTNbaIk1D68ZcbuqpCTvVbqrPeAvDgCmpZCyaKCviyaaOQ2oXNfdQl_C8lttJcOTTYjClts0ug1fbkLyO02DUicqvrf1xNFyufoFMgMVN&3u2048&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=9820',
  },
  {
    id: 3,
    geometry: {
      location: {
        lat: 51.5194133,
        lng: -0.1269566,
      },
    },
    name: 'The British Museum',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwIg5fMQvsSjHA9ZqzTJpN-oy51LqP4c3vNr81T1XrI7S3RGDoInwUvZz99U1C4VXacO2fjqNrninFsBXs7BCBVgMSjK6jLx6yUwX-WeyKNOlLCGAz-caZKcaswglCYQIV8laCv-4FJy8O1sKckJz0oHkT5KQCwEXnrqRJTycDfytrSi&3u4608&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=20429',
  },
  {
    id: 4,
    geometry: {
      location: {
        lat: 51.5021585,
        lng: -0.1293572,
      },
    },
    name: 'Churchill War Rooms',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwLcJaQccG2ahQMGN1gFHPagQa9btul59HhkT33Bk6Zb7PEMvnc4sJ_je6c-LP1Qui2VOsFJXZWS35tffMlEodrLRYs_uWb6-4rgQI1pID0zImMxzalP4J0M9-iHIzM1tTBpPkdVD_oAKgvGN0-2xOk1C6flBZQrEszbIHiK_IN2DBqI&3u4032&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=75556',
  },
  {
    id: 5,
    geometry: {
      location: {
        lat: 51.4998427,
        lng: -0.1258311,
      },
    },
    name: 'Statue of Oliver Cromwell, Westminster',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJ_6mPqodIIXzpYwdKPIGWIAOfSPzQZ40uGJBtBGLfHEyKOfGebvURrPYRf2jFX5DMDnOjm7lgJGxcOxv1RgyRP3OWEev0Rtmb_mh-DTjNPJ2jqeh1P9fxp-KOkBp4GUcttDcSqA3LhCAmtP4lZ-w8ZHS6wv3qO-m8jGOuR5fAzSoAo&3u3014&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=102811',
  },
  {
    id: 6,
    geometry: {
      location: {
        lat: 51.5019938,
        lng: -0.1191926,
      },
    },
    name: 'SEA LIFE Centre London Aquarium',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwI6975d_kFB_v_8Ns89eg2uP3yJzWTpBvCR5zrrqvocT0ad-4-11ybakvz1kN91ZMnl3Jh_2uNchtcVKlXbDNqCHBMXsYHdlMrjDB-vlcuwx0Q3ATaYTSDvzp-4FSrazmw20wEnn53GpF8hWKfoiBbc4_m9j-51_sJqG9oCWHBLESEs&3u4128&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=130126',
  },
  {
    id: 7,
    geometry: {
      location: {
        lat: 51.5032973,
        lng: -0.1195537,
      },
    },
    name: 'lastminute.com London Eye',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwKewDdXOswsI9-_MvI3ui_U3hoC8DmHUnhottnDCrM2DVAuw5ycWIkl4KQ1OdpnpcKLIhaDVkKOLhLG8ZZEWVtRJ4o7v_uHIaRFoT6xu2P1SUO0ljFNdUTLoKHxt3L-aq5lUhog53qbIFKVlFIDE3ZKLdwDvquxsoVdx5VqvsZiD1wT&3u3648&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=45859',
  },
  {
    id: 8,
    geometry: {
      location: {
        lat: 51.5005394,
        lng: -0.1357828,
      },
    },
    name: 'Flanders Fields Memorial Garden',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJhSI3Q45kvQW_dU6jmf8o5Fk9eAFCR6jBfxI-KAsYGRTYvJCO89BUa0bMFcxMIZ-yQrcUK39B6qNTChU_jeQPdzIAkkmLzxSgTbTbTlM8uSRti-NAeECEH1kZUEDm4a_S42lpu3tk5f_u5jtsgWHYq-T24nUoeI8SV9urtqbPg-MWs&3u3072&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=4326',
  },
  {
    id: 9,
    geometry: {
      location: {
        lat: 51.514848,
        lng: -0.124801,
      },
    },
    name: 'h Club London',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwIQAJ_DwvTYWfGEH5r1-8YkFQC_nIrHtuxZHS7VIVha0KZyDq7B8VQICeF5tImHxG0N8Zgr6anD6HR01GvvIVRyVKgqkZWyV1jk3tgk23x3BM344ICektjEKvvstpSfkPP6HgYgbBdKHXAc8IRh63AjGpLQdBlPhwDkgOaRaMTTNzOi&3u2988&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=63834',
  },
  {
    id: 10,
    geometry: {
      location: {
        lat: 51.50892899999999,
        lng: -0.128299,
      },
    },
    name: 'The National Gallery',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwK9j5Z-9Aphea2LEdRn5bWlporhHQySCnNp-kUEr5dRE20MOhHDHjmJd-7D63gRMIg3UAXV9bNJseaLIXhLWiRDmFmM7MOQjZz6RYs_5Zzht_Oy-1Fg-8ppVMzTovXqGk9s9SNDHnpO87YSc-C4tvksnywbtvlgbkEL3Yy_bTMIsOGg&3u4160&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=101811',
  },
  {
    id: 11,
    geometry: {
      location: {
        lat: 51.5176183,
        lng: -0.09677819999999998,
      },
    },
    name: 'Museum of London',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwI1dL45q0GnTbFjt0_nFaqGwADAqlmsS-KKsHDDaON-3JwWIrjQelP_YmZhvMuYEja14HnOf5VX8OQdj26xEmfu9uC2e6koDIumY8u0eVP9AG_UtIeYFQb9jUlWFcckINb-aqfEim7D3g1NHK4wjyaVe7TWriiBQ2duWmj77qY3yy2v&3u1125&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=65658',
  },
  {
    id: 12,
    geometry: {
      location: {
        lat: 51.50759530000001,
        lng: -0.09935640000000001,
      },
    },
    name: 'Tate Modern',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwL2NKoRha0TSWxDai85qnHB4RUV-I-cwjhJp0MiUpUpURtF2qpJakziRB2WZiNnAI2OrvbyWQ6Oe97QznI3WHQM94xaSSoPs51HUl6GXHLtcza38wOdQUqMXwRPQd2F8_q1DbnZYczRNEaXvhb1B78DVqYWPbmPw4eHbR11Mz8W1rkp&3u2268&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=64930',
  },
  {
    id: 13,
    geometry: {
      location: {
        lat: 51.5138717,
        lng: -0.1400263,
      },
    },
    name: 'Liberty London',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJ2pL51B7DUT5pYCSuOjncNUoNsY56m7kOC0G3HAbPyeEK11gC2_l0z11EJg4OTmL_diKr5Lx2zUNoUOTk4JPiMTPf12KqO72it6jrZEaWUb9Z0mWNxCiHz-UmocTRxhiwf08yS8T9u5sns-IndIycM_He7bscPT3aGEPA50Sn6vD5J&3u1017&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=45712',
  },
  {
    id: 14,
    geometry: {
      location: {
        lat: 51.4986769,
        lng: -0.1289446,
      },
    },
    name: 'Westminster Abbey',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwLHBJOzzQ0TSrtSTL4Ms3ariXnOfopVEbCj9E2OfarCBHzFBL8xOGD028VY8tdQe-bMUWye9fLOvPvNXDPht9FvLbg9YbqawXWs-stkAgoy7k55W9mypPwjd7Id4edmqotqIJHyp9bSUy81D3-EumU7XDQkjzziWcen5NlOctNtOG8&3u3120&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=80765',
  },
  {
    id: 15,
    geometry: {
      location: {
        lat: 51.501364,
        lng: -0.14189,
      },
    },
    name: 'Buckingham Palace',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJsnBjvb4fN-Y2rCUGdvIaTYtVwFzklawm2LTZFsUDKbK2XU2QlnT9CgoVDrvIoPGQ7snZIJWOpGcYuicawRIacwF9jJTWai2-x8Ag2-yNBiFNIBlP0KlVmSU04lthI1wYhVbJeVAONcxopXMOazEcYUZeg-lEcIv1fRNcIsbOX7hL_&3u820&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=102118',
  },
  {
    id: 16,
    geometry: {
      location: {
        lat: 51.50072919999999,
        lng: -0.1246254,
      },
    },
    name: 'Big Ben',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwKBC7TRHXQfiixBq4C_EBQVOxbItKd2JaA_eXJaRxzrB0ueZk0KlnU71PGGixPowi2r2G8wfs923AxA6AzjK72tVtny1qdE9xYkJkJZnjWqMeYiDaZerMdPxy-TsFT6zHGyY_NyQG2ZUYARe8YnxHFSH3izpzZFmt-OkkrUjW9Km4Q&3u5312&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=81069',
  },
  {
    id: 17,
    geometry: {
      location: {
        lat: 51.5063335,
        lng: -0.1309615,
      },
    },
    name: 'Institute of Contemporary Arts',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJUEFMvI5dO9SnsvkGMwfSEEOHg9lfPQT-VEsY6dMVqWWZoV3sOt_gNailaOwlUVcJa8xaCnZ9q9f-qd4VxE_mEoOfgnerKJQdU17uWwMNuPL6GkJRfseeO81SMOqi2cS8NLw0KEGXL2vOW-SI9VaMSMH05GTNoGFC1DKO8jw_oRf-x&3u4000&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=68276',
  },
  {
    id: 18,
    geometry: {
      location: {
        lat: 51.5138453,
        lng: -0.0983506,
      },
    },
    name: "St. Paul's Cathedral",
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJoAvWhHdQa3gPC7Pz_ylviYhF02fECTF9ScklH-vMe-HhrCwtvXW4EZLJOAsUMeooZoCSMiPsTUJGJXA7uPDlka-0rAi1zZ8jE0U5pF4u6h22GZ1Ho-gcY-aN_hJ6o-mBmk88ZPEW9Pmhu_wVX-SYkyKA1TkDMu5ocmbNbEIC5bTk-&3u4032&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=45838',
  },
  {
    id: 19,
    geometry: {
      location: {
        lat: 51.4958366,
        lng: -0.1086584,
      },
    },
    name: 'Imperial War Museum',
    photo:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJHFu8XFSsefujF6xbEOsuatEtF913c0pxaHgAJaTGebDrCZt7g5EZVBnFquqkDC-UU9HS2fWZJNE9dx9g_gTPHTYpc_kv0JaCxkBJrTnUPLygD2wsv-ff94xt7mg31hfN8dZ5ec-LsQ2DtDCUSHgXTHQoSCzl5cnzi5B06gpZhH8Jk&3u4032&5m1&2e1&callback=none&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw&token=55620',
  },
];
