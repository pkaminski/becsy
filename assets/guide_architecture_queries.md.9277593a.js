import{_ as s,c as a,a as t,b as e,r as p,o}from"./app.cd45da36.js";const w='{"title":"Queries","description":"","frontmatter":{},"headers":[{"level":2,"title":"Basic query syntax","slug":"basic-query-syntax"},{"level":2,"title":"Declaring entitlements","slug":"declaring-entitlements"},{"level":2,"title":"Reactive queries","slug":"reactive-queries"},{"level":2,"title":"Ordering query results","slug":"ordering-query-results"}],"relativePath":"guide/architecture/queries.md","lastUpdated":1646465876000}',c={},u=e(`<h1 id="queries" tabindex="-1">Queries <a class="header-anchor" href="#queries" aria-hidden="true">#</a></h1><p>A query is a set of constraints to select entities based on the components they have. Queries are always defined in systems at construction time. It&#39;s not possible to run new ad-hoc queries once the world has been created.</p><p>A query is always updated with the entities that match the components&#39; condition immediately before a system is executed. The work needed to keep a query updated is proportional to the number of shape changes (component additions and removals) in the world rather than the total number of entities.</p><h2 id="basic-query-syntax" tabindex="-1">Basic query syntax <a class="header-anchor" href="#basic-query-syntax" aria-hidden="true">#</a></h2><p>Queries use a small domain-specific language to express their constraints and are assigned to system properties at construction time:</p><div class="language-ts"><pre><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">system</span></span> <span class="token keyword">class</span> <span class="token class-name">SystemA</span> <span class="token keyword">extends</span> <span class="token class-name">System</span> <span class="token punctuation">{</span>
  <span class="token comment">// Query for all entities with an Enemy component but no Dead component.</span>
  <span class="token keyword">private</span> activeEnemies <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>q <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Enemy<span class="token punctuation">)</span><span class="token punctuation">.</span>but<span class="token punctuation">.</span><span class="token function">without</span><span class="token punctuation">(</span>Dead<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entity <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>activeEnemies<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> enemy <span class="token operator">=</span> entity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>Enemy<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// guaranteed to have an Enemy component</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-js"><pre><code><span class="token keyword">class</span> <span class="token class-name">SystemA</span> <span class="token keyword">extends</span> <span class="token class-name">System</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Query for all entities with an Enemy component but no Dead component.</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>activeEnemies <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token parameter">q</span> <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Enemy<span class="token punctuation">)</span><span class="token punctuation">.</span>but<span class="token punctuation">.</span><span class="token function">without</span><span class="token punctuation">(</span>Dead<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entity <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>activeEnemies<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> enemy <span class="token operator">=</span> entity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>Enemy<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// guaranteed to have an Enemy component</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>First you specify that you want all <code>current</code> entities that satisfy the constraints; we&#39;ll introduce other options <a href="#reactive-queries">later</a>. Then you use <code>with</code> and <code>without</code> to constrain what component types an entity must and must not have to satisfy the query. Each clause can list any number of component types, which is equivalent to repeating the clause.</p><p>The query object will have a <code>current</code> property that&#39;s an array of entities you can iterate over in your <code>execute</code> hook.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Queries are only updated between system executions so you don&#39;t need to worry about accidentally mutating the entity array while you&#39;re iterating over it by adding or removing components.</p></div><h2 id="declaring-entitlements" tabindex="-1">Declaring entitlements <a class="header-anchor" href="#declaring-entitlements" aria-hidden="true">#</a></h2><p>Query definitions also have a secondary function: they declare what component types the system will be reading and writing. These declarations are not query-specific \u2014 the entitlements from all of a system&#39;s queries are combined together and applied to the system \u2014 but it&#39;s a convenient place to express them as you&#39;ll often need to read and write the component types that your queries are constrained on.</p><p>You can only read and write component types for which you declared entitlements, otherwise you&#39;ll get an error. Becsy also uses the entitlements to help <a href="./systems.html#execution-order">order system execution</a> and determine which systems can safely run concurrently.</p><p>You declare entitlements by following any clause that mentions component types with a <code>read</code> or <code>write</code>:</p><div class="language-ts"><div class="highlight-lines"><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">system</span></span> <span class="token keyword">class</span> <span class="token class-name">Namer</span> <span class="token keyword">extends</span> <span class="token class-name">System</span> <span class="token punctuation">{</span>
  <span class="token comment">// Select all Players that don&#39;t have a Name component yet.</span>
  <span class="token keyword">private</span> uninitializedPlayers <span class="token operator">=</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>q <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Player<span class="token punctuation">)</span><span class="token punctuation">.</span>but<span class="token punctuation">.</span><span class="token function">without</span><span class="token punctuation">(</span>Name<span class="token punctuation">)</span><span class="token punctuation">.</span>write<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> player <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>uninitializedPlayers<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Add a name to each player, which will also remove it from the query.</span>
      player<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>Name<span class="token punctuation">,</span> <span class="token punctuation">{</span>value<span class="token operator">:</span> <span class="token function">getRandomName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-js"><div class="highlight-lines"><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token keyword">class</span> <span class="token class-name">Namer</span> <span class="token keyword">extends</span> <span class="token class-name">System</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Select all Players that don&#39;t have a Name component yet.</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>uninitializedPlayers <span class="token operator">=</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token parameter">q</span> <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Player<span class="token punctuation">)</span><span class="token punctuation">.</span>but<span class="token punctuation">.</span><span class="token function">without</span><span class="token punctuation">(</span>Name<span class="token punctuation">)</span><span class="token punctuation">.</span>write<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> player <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>uninitializedPlayers<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Add a name to each player, which will also remove it from the query.</span>
      <span class="token comment">// This is a typical &quot;factory&quot; pattern in ECS.</span>
      player<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>Name<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token function">getRandomName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Above, we declared that we&#39;ll be writing the <code>Name</code> component; adding and removing count as writing, as does calling <code>Entity.write</code>. Any <code>with</code> or <code>without</code> component types are automatically marked as <code>read</code> so you don&#39;t need to say it explicitly (but it&#39;s allowed). If you want to declare an entitlement for a component type not used as a query constraint you can employ the <code>using</code> clause, which doesn&#39;t affect the query in any way, only supplies component types for entitlement suffixes: <code>this.query(q =&gt; q.using(RandomComponent).write)</code>.</p><h2 id="reactive-queries" tabindex="-1">Reactive queries <a class="header-anchor" href="#reactive-queries" aria-hidden="true">#</a></h2><p>Using reactive queries make it possible to react to changes on entities and its components. One common use case is to detect whenever an entity has been added or removed from a query:</p><div class="language-ts"><pre><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">system</span></span> <span class="token keyword">class</span> <span class="token class-name">SystemA</span> <span class="token keyword">extends</span> <span class="token class-name">System</span> <span class="token punctuation">{</span>
  <span class="token comment">// Query for entities that either became a Box with a Transform, or stopped being one.</span>
  <span class="token keyword">private</span> boxes <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>q <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>added<span class="token punctuation">.</span>and<span class="token punctuation">.</span>removed<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Box<span class="token punctuation">,</span> Transform<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> addedBox <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>boxes<span class="token punctuation">.</span>added<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> removedbox <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>boxes<span class="token punctuation">.</span>removed<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-js"><pre><code><span class="token keyword">class</span> <span class="token class-name">SystemA</span> <span class="token keyword">extends</span> <span class="token class-name">System</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Query for entities that either became a Box with a Transform, or stopped being one.</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>boxes <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token parameter">q</span> <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>added<span class="token punctuation">.</span>and<span class="token punctuation">.</span>removed<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Box<span class="token punctuation">,</span> Transform<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> addedBox <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>boxes<span class="token punctuation">.</span>added<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> removedbox <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>boxes<span class="token punctuation">.</span>removed<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>The <code>added</code> and <code>removed</code> lists are computed just before the system executes, and will include all entities that would have been added to or removed from the <code>current</code> list since the system last executed (usually the previous frame).</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If an entity was both added and then removed between system executions, it will <em>not</em> be included in the <code>added</code> list. (And similarly for the <code>removed</code> list.) There&#39;s currently no way to query for such ephemeral entities in Becsy.</p></div><p>Another common use case is to detect when a component&#39;s field values have been changed, whether due to a call to <code>Entity.write</code> or because the field&#39;s value was <a href="./components.html#referencing-entities">automatically updated</a>:</p><div class="language-ts"><pre><code><span class="token comment">// Get entities with Box and Transform, where Transform fields changed since last time.</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>q <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>changed<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Box<span class="token punctuation">)</span><span class="token punctuation">.</span>and<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Transform<span class="token punctuation">)</span><span class="token punctuation">.</span>track<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-js"><pre><code><span class="token comment">// Get entities with Box and Transform, where Transform fields changed since last time.</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token parameter">q</span> <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>changed<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Box<span class="token punctuation">)</span><span class="token punctuation">.</span>and<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Transform<span class="token punctuation">)</span><span class="token punctuation">.</span>track<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>We express the query as usual, but append <code>track</code> to any component types whose changes we want to track. (You must track at least one component type.)</p><p>Newly added entities will <em>not</em> be included in the <code>changed</code> list, even if their fields were written to after the component was added. Basically, an entity will be in at most one of the <code>added</code>, <code>removed</code>, and <code>changed</code> lists \u2014 they never overlap. For convenience, you can request a list that combines any of these attributes instead:</p><div class="language-ts"><pre><code><span class="token comment">// Get entities that became a Box with Transform, or whose Transform was changed.</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>q <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>addedOrChanged<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Box<span class="token punctuation">)</span><span class="token punctuation">.</span>and<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Transform<span class="token punctuation">)</span><span class="token punctuation">.</span>track<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-js"><pre><code><span class="token comment">// Get entities that became a Box with Transform, or whose Transform was changed.</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token parameter">q</span> <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>addedOrChanged<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Box<span class="token punctuation">)</span><span class="token punctuation">.</span>and<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Transform<span class="token punctuation">)</span><span class="token punctuation">.</span>track<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Finally, not that a single query can include any or all of the various lists (each of which will be iterable separately), and that this is more efficient than creating separate queries for them.</p><h2 id="ordering-query-results" tabindex="-1">Ordering query results <a class="header-anchor" href="#ordering-query-results" aria-hidden="true">#</a></h2><p>Query results are not guaranteed to be in any specific order by default, but you can request that they be sorted using any kind expression over their entities:</p><div class="language-ts"><pre><code><span class="token decorator"><span class="token at operator">@</span><span class="token function">system</span></span> <span class="token keyword">class</span> <span class="token class-name">Renderer</span> <span class="token keyword">extends</span> <span class="token class-name">System</span> <span class="token punctuation">{</span>
  <span class="token comment">// Query for all Sprites and order by ascending zIndex.</span>
  <span class="token keyword">private</span> sprites <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>
    q <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Sprite<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orderBy</span><span class="token punctuation">(</span>entity <span class="token operator">=&gt;</span> entity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>Sprite<span class="token punctuation">)</span><span class="token punctuation">.</span>zIndex<span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token comment">// Iterate over all sprites in order of zIndex.</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entity <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sprites<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">render</span><span class="token punctuation">(</span>entity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>Sprite<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-js"><pre><code><span class="token keyword">class</span> <span class="token class-name">Renderer</span> <span class="token keyword">extends</span> <span class="token class-name">System</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Query for all Sprites and order by ascending zIndex.</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sprites <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>
      <span class="token parameter">q</span> <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Sprite<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orderBy</span><span class="token punctuation">(</span><span class="token parameter">entity</span> <span class="token operator">=&gt;</span> entity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>Sprite<span class="token punctuation">)</span><span class="token punctuation">.</span>zIndex<span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Iterate over all sprites in order of zIndex.</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entity <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sprites<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">render</span><span class="token punctuation">(</span>entity<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>Sprite<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>A common case is ordering entities by order of creation, for example to execute queued commands in the right order:</p><div class="language-ts"><pre><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>q <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Command<span class="token punctuation">)</span><span class="token punctuation">.</span>write<span class="token punctuation">.</span><span class="token function">orderBy</span><span class="token punctuation">(</span>entity <span class="token operator">=&gt;</span> entity<span class="token punctuation">.</span>ordinal<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-js"><pre><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token parameter">q</span> <span class="token operator">=&gt;</span> q<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span>Command<span class="token punctuation">)</span><span class="token punctuation">.</span>write<span class="token punctuation">.</span><span class="token function">orderBy</span><span class="token punctuation">(</span><span class="token parameter">entity</span> <span class="token operator">=&gt;</span> entity<span class="token punctuation">.</span>ordinal<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>Note that ordering entities can get expensive (though we apply some optimizations for common cases) so use this feature judiciously!</p>`,39);function i(l,r,k,d,y,m){const n=p("language-switcher");return o(),a("div",null,[t(n),u])}var f=s(c,[["render",i]]);export{w as __pageData,f as default};
