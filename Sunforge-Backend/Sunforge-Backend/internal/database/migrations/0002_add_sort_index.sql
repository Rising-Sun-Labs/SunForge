-- Ensure every page has a row in page_order
INSERT INTO page_order (page_id, sort_index)
SELECT p.id, 1000000
FROM pages p
LEFT JOIN page_order po ON po.page_id=p.id
WHERE po.page_id IS NULL;