$TTL    604800
@       IN      SOA     ns1.tokyo-foundation.com. root.tokyo-foundation.com. (
                  3       ; Serial
             604800     ; Refresh
              86400     ; Retry
            2419200     ; Expire
             604800 )   ; Negative Cache TTL
;
; name servers - NS records
     IN      NS      ns1.tokyo-foundation.com.

; name servers - A records
ns1.tokyo-foundation.com.          IN      A      172.20.0.2

webapp-with-proxy.tokyo-foundation.com.        IN      A      172.20.0.6
webapp-without-proxy.tokyo-foundation.com.        IN      A      172.20.0.7