  </main>
</div>

<script>
// "+ Add" clones the last row of a list, clears it, and renumbers the
// [0], [1], … indices so PHP rebuilds the array correctly on submit.
document.addEventListener('click', (ev) => {
  const addBtn = ev.target.closest('[data-add]');
  if (addBtn) {
    const group = addBtn.closest('[data-list]');
    const items = group.querySelectorAll(':scope > [data-item]');
    if (!items.length) return;
    const copy = items[items.length - 1].cloneNode(true);
    copy.querySelectorAll('input, textarea').forEach((el) => {
      if (el.type === 'checkbox') el.checked = false;
      else if (el.type !== 'hidden') el.value = '';
    });
    group.appendChild(copy);
    renumber(group);
    copy.querySelector('input, textarea')?.focus();
    return;
  }

  const removeBtn = ev.target.closest('[data-remove]');
  if (removeBtn) {
    const item = removeBtn.closest('[data-item]');
    const group = item.closest('[data-list]');
    if (group.querySelectorAll(':scope > [data-item]').length <= 1) {
      item.querySelectorAll('input, textarea').forEach((el) => { el.value = ''; });
      return;
    }
    item.remove();
    renumber(group);
  }
});

function renumber(group) {
  const base = group.dataset.base;
  group.querySelectorAll(':scope > [data-item]').forEach((item, i) => {
    item.querySelectorAll('input, textarea, select').forEach((el) => {
      if (!el.name || !base) return;
      el.name = el.name.replace(base + '[', base + '[').replace(
        new RegExp('^' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\[\\d+\\]'),
        base + '[' + i + ']'
      );
    });
  });
}
</script>
</body>
</html>
